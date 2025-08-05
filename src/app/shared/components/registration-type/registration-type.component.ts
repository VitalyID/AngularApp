import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { Store } from '@ngxs/store';
import * as uuid from 'uuid';
import { AddUser } from '../../../state/user/user.action';

import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { CustomRadioButtonComponent } from '../custom-radio-button/custom-radio-button.component';
import { TypeUser } from '../custom-radio-button/types/enum/typeUser';
import {
  RadioButtonConfig,
  RadioButtons,
} from '../custom-radio-button/types/interface/radioButton';
import { StepService } from '../stepper/service/step.service';
import { UserType } from '../../../state/user/user.models';

@Component({
  selector: 'registration-type',
  imports: [CustomRadioButtonComponent, ButtonsComponent],
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

  buttonNext: ButtonConfig = {
    text: 'Далее',
    borderStyle: 'none',
  };

  buttonLast: ButtonConfig = {
    text: 'Назад',
    borderStyle: 'none',
  };

  client_type: UserType = { client_type: 'payer' };
  disabledBtn: boolean = true;

  readonly #stepService = inject(StepService);
  readonly #store = inject(Store);

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
    this.updateClientType(data);
    this.updateButtonState();
  }

  nextStep() {
    this.#store.dispatch(new AddUser(this.client_type));
    this.#stepService.changeStep$.next(2);
  }

  lastStep() {
    this.#stepService.changeStep$.next(0);
  }

  getTypeUser(user: string) {
    const data = Object.entries(TypeUser);
    const [typeUser] = data.find(([key, value]) => value === user) || [];

    return typeUser;
  }

  updateButtonState() {
    this.disabledBtn = !this.client_type;
  }

  updateClientType(data: string) {
    const user = this.getTypeUser(data);
    this.client_type = { client_type: user as keyof typeof TypeUser };
  }
}
