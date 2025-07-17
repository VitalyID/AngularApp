import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeUser } from './types/enum/typeUser';
import { RadioButtons } from './types/interface/radioButton';

@Component({
  selector: 'custom-radio-button',
  imports: [FormsModule],
  templateUrl: './custom-radio-button.component.scss',
  styleUrl: './custom-radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomRadioButtonComponent {
  @Input() radioConfig = signal<RadioButtons>({
    icon: '',
    iconActive: '',
    button: [
      {
        name: '',
        checked: false,
        id: '',
      },
    ],
  });

  @Output() userConfiture = new EventEmitter();

  setUser(event: Event) {
    const checkedButton = event.target as HTMLInputElement;

    const newRadioConfig = this.radioConfig();
    const newButtons = this.radioConfig().button.map((element) => {
      return { ...element, checked: element.id === checkedButton.id };
    });

    this.radioConfig.set({ ...newRadioConfig, button: newButtons });

    const userValue = this.radioConfig().button.find(
      (el) => el.checked === true,
    )?.name;

    const userKey = Object.keys(TypeUser) as (keyof typeof TypeUser)[];
    userKey.forEach((userKey) => {
      if (TypeUser[userKey] === userValue) {
        this.userConfiture.emit(userKey);
      }
    });
  }
}
