import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs';
import * as uuid from 'uuid';
import { UserBankCard } from '../../shared/components/bank-card/types/interface/bankCard';
import { RadioButtons } from '../../shared/components/custom-radio-button/types/interface/radioButton';
import { GetUserInfo, UpdateBankCards } from '../../state/user/user.action';
import { StateUser } from '../../state/user/user.models';
import { UserState } from '../../state/user/user.state';
import { ButtonConfig } from '../../types/interfaces/sectionItem';
import { BankCard } from './../../state/user/user.models';

@Component({
  selector: 'card-details',
  standalone: false,
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailsComponent implements OnInit {
  readonly #store = inject(Store);
  readonly #inject = inject(Injector);
  readonly #destroyRef = inject(DestroyRef);

  // debug: user: Signal<StateUser> = this.#store.selectSignal(UserState.getUserInfo);

  user$ = signal<Partial<StateUser>>({});

  radioConfig = signal<RadioButtons[]>([]);

  numberCard = signal<string>('0000 0000 0000 0000');
  isTitle: boolean = false;
  isButtons: boolean = false;

  bankCard: BankCard = {
    card_number: '',
    expiry: '',
    cvc: '',
    isActive: false,
  };

  activeCard: UserBankCard = {
    typeBankCard: '../../../assets/images/Visa card.png',
    balansCard: 0,
    nameCardHolder: '',
    numberCard: '1234 5678 1234 5678',
    expirationDate: '06/28',
  };

  removeCard: ButtonConfig = {
    text: 'Удаление карты',
    background: 'none',
    borderRadius: '6px',
    borderStyle: '1px solid #E1E3E1',
    color: '#101011',
    boxShadow: 'none',
  };

  addCard: ButtonConfig = {
    text: 'Привязать карту',
    borderStyle: 'none',
  };

  ngOnInit(): void {
    this.#store.dispatch(new GetUserInfo());

    this.#store
      .select(UserState.getUserInfo)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap((user: StateUser) => {
          user.cards.forEach((card) => {
            if (card.isActive) {
              this.activeCard.numberCard = card.card_number;
              this.activeCard.nameCardHolder =
                user.first_name + ' ' + user.last_name;
              this.activeCard.expirationDate = card.expiry;
            }
          });
        }),
      )
      .subscribe((user) => this.user$.set(user));

    runInInjectionContext(this.#inject, () => {
      effect(() => {
        if (this.user$()) {
          this.radioConfig.set(this.updateRadioConfig());
        }
      });
    });
  }

  typeBankCard() {
    const random = Math.round(Math.random());
    return random === 1
      ? '../../../assets/images/Master card.png'
      : '../../../assets/images/Visa card.png';
  }

  setActiveCard(card: BankCard) {
    const numberActiveCard = card.card_number;
    this.user$.update((currentUser) => {
      const newCards =
        currentUser.cards?.map((c) => ({
          ...c,
          isActive: c.card_number === numberActiveCard,
        })) || [];

      this.#store.dispatch(new UpdateBankCards(newCards));
      return { ...currentUser, cards: newCards };
    });
  }

  updateRadioConfig(): RadioButtons[] {
    return (
      this.user$().cards?.map((card) => ({
        icon: card.isActive ? 'checkboxActive' : 'checkbox',
        name: '',
        checked: card.isActive,
        id: uuid.v4(),
      })) || []
    );
  }

  setNewCard(card: BankCard[]) {
    this.bankCard = { ...card[0] };
  }

  addBankCard() {
    this.user$.update((user) => {
      const currentCards = user.cards || [];
      return {
        ...user,
        cards: [...currentCards, this.bankCard],
      };
    });

    if (this.user$().cards) {
      this.#store.dispatch(new UpdateBankCards(this.user$().cards!));
    }
  }

  removeBankCard() {
    const updatedCard = this.user$().cards?.filter((card) => {
      return card.isActive === false;
    });
    if (updatedCard) {
      this.#store.dispatch(new UpdateBankCards(updatedCard));
    }
  }
}
