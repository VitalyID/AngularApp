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
import { UserBankCard } from '../../shared/components/bank-card/types/interface/bankCard';
import { RadioButtons } from '../../shared/components/custom-radio-button/types/interface/radioButton';
import { GetUserInfo } from '../../state/user/user.action';
import { StateUser } from '../../state/user/user.models';
import { UserState } from '../../state/user/user.state';
import { ButtonConfig } from '../../types/interfaces/sectionItem';

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

  user: Signal<StateUser> = this.#store.selectSignal(UserState.getUserInfo);

  radioConfig = signal<RadioButtons>({
    icon: 'checkbox',
    name: '',
    checked: false,
    id: uuid.v4(),
  });

  numberCard = signal<string>('0000 0000 0000 0000');
  isTitle: boolean = false;
  isButtons: boolean = false;

  ngOnInit(): void {
    this.#store.dispatch(new GetUserInfo());

    runInInjectionContext(this.#inject, () => {
      effect(() => {
        if (this.user()) {
          this.updateRadioConfig();
        }
      });
    });
  }

  bankCard: UserBankCard = {
    typeBankCard: signal('../../../assets/images/Visa card.png'),
    balansCard: signal(0),
    nameCardHolder: signal('Алибеков Гайсир'),
    numberCard: signal('1234 5678 1234 5678'),
    expirationDate: signal('06/28'),
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

  typeBankCard() {
    const random = Math.round(Math.random());
    return random === 1
      ? '../../../assets/images/Master card.png'
      : '../../../assets/images/Visa card.png';
  }

  isActiveCard(cardNumber: string) {}

  updateRadioConfig(): signal<RadioButtons[]> {
    return signal(
      this.user().cards.map((card) => ({
        icon: card.isActive ? 'checkboxActive' : 'checkbox',
        name: '',
        checked: card.isActive,
        id: uuid.v4(),
      })),
    );
  }
}
