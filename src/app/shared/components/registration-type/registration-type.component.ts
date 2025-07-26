import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import * as uuid from 'uuid';
import { CustomRadioButtonComponent } from '../custom-radio-button/custom-radio-button.component';
import { TypeUser } from '../custom-radio-button/types/enum/typeUser';
import {
  RadioButtonConfig,
  RadioButtons,
} from '../custom-radio-button/types/interface/radioButton';

@Component({
  selector: 'registration-type',
  imports: [CustomRadioButtonComponent],
  templateUrl: './registration-type.component.html',
  styleUrl: './registration-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationTypeComponent {
  radioButtons: RadioButtonConfig[] = [];
  RadioButtonConfig: WritableSignal<RadioButtons> = signal<RadioButtons>({
    icon: 'checkbox',
    iconActive: 'checkboxActive',
    button: this.generatorRadioButtonConfig(),
  });

  client_type = signal('');

  generatorRadioButtonConfig(): RadioButtonConfig[] {
    const typeValue = Object.values(TypeUser);

    typeValue.forEach((user) => {
      const newButtonConfig: RadioButtonConfig = {
        name: user,
        checked: false,
        id: uuid.v4(),
      };

      this.radioButtons = [...this.radioButtons, newButtonConfig];
    });

    return this.radioButtons;
  }

  userChoice(data: string) {
    this.client_type.set(data);
  }
}
