import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  Signal,
  signal,
} from '@angular/core';
import { Store } from '@ngxs/store';
import * as uuid from 'uuid';
import { BankCardNumberSpaces } from '../../shared/components/bank-card/pipe/card-number';
import { RadioButtons } from '../../shared/components/custom-radio-button/types/interface/radioButton';
import { GetUserInfo, UpdateBankCards } from '../../state/user/user.action';
import { StateUser } from '../../state/user/user.models';
import { UserState } from '../../state/user/user.state';
import { typeBankCard } from '../../state/user/user.utils';
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

  user$ = signal<Partial<StateUser>>({});

  state: Signal<StateUser> = this.#store.selectSignal(UserState.getUserInfo);
  activeBankCard: Signal<BankCard> = this.#store.selectSignal(
    UserState.getActiveCard,
  );

  radioConfig = signal<RadioButtons[]>([]);

  numberCard = signal<string>('0000 0000 0000 0000');

  bankCard: BankCard = {
    card_number: '',
    expiry: '',
    cvc: '',
    isActive: false,
  };

  ngOnInit(): void {
    this.#store.dispatch(new GetUserInfo());

    runInInjectionContext(this.#inject, () => {
      effect(() => {
        if (this.user$()) {
          this.radioConfig.set(this.updateRadioConfig());
        }
      });

      effect(() => {
        this.user$.set(this.state());
      });
    });
  }

  userActiveCard(cardNumber: string) {
    const cardWithoutSpaces = cardNumber.replace(/\s/g, '');

    const numberActiveCard = cardWithoutSpaces;
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
        name: this.copyPipe(card.card_number) ?? '',
        checked: card.isActive,
        id: uuid.v4(),
        imgSrc: card.typeCard,
        imgAlt: 'Тип банковской карточки',
      })) || []
    );
  }

  setNewCard(card: BankCard[]) {
    this.bankCard = { ...card[0], typeCard: typeBankCard() };
    console.log('debug new bankCard: ', this.bankCard);
  }

  addBankCard() {
    console.log('debug 1: ', this.user$().cards);

    this.setCardFalse();
    this.user$.update((user) => {
      const currentCards = user.cards || [];
      return {
        ...user,
        cards: [...currentCards, this.bankCard],
      };
    });

    if (this.user$().cards) {
      const listCorrectCards = this.removeTypeBankCard(this.user$().cards);

      this.#store.dispatch(new UpdateBankCards(listCorrectCards));
      console.log('debug 2: ', this.user$().cards);
    }
  }

  deleteBankCard() {
    const inActiveCard = this.user$().cards?.filter((card) => {
      return card.isActive === false;
    });

    const updatedCard = this.removeTypeBankCard(inActiveCard);

    if (updatedCard) {
      this.#store.dispatch(new UpdateBankCards(updatedCard));
    }
  }

  setCardFalse() {
    this.user$.update((user) => {
      const currentCards = user.cards || [];
      currentCards.map((card) => (card.isActive = false));
      return { ...user, cards: [...currentCards] };
    });
  }

  removeTypeBankCard(cards: BankCard[] | undefined): BankCard[] {
    if (!cards) return [];
    return cards.map((card) => {
      const { typeCard, ...restCard } = card;
      return restCard as BankCard;
    });
  }

  setCard(userCard: RadioButtons) {
    this.userActiveCard(userCard.name);
  }

  copyPipe(cardNumber: string) {
    const pipe = new BankCardNumberSpaces();
    return pipe.transform(cardNumber);
  }
}
