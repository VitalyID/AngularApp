import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import * as uuid from 'uuid';
import { RadioButtons } from '../../shared/components/custom-radio-button/types/interface/radioButton';
import { ButtonConfig } from '../../types/interfaces/sectionItem';

@Component({
  selector: 'card-details',
  standalone: false,
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailsComponent {
  radioConfig = signal<RadioButtons>({
    icon: 'checkbox',
    iconActive: 'checkboxActive',
    button: [{ name: '', checked: false, id: uuid.v4() }],
  });

  numberCard = signal<string>('1234 5678 9124 5678');
  isTitle: boolean = false;
  isButtons: boolean = false;

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
}
