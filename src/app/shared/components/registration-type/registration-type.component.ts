import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Store } from '@ngxs/store';
import * as uuid from 'uuid';
import { UpdateUser } from '../../../state/user/user.action';

import { UserType } from '../../../state/user/user.models';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { CustomRadioButtonComponent } from '../custom-radio-button/custom-radio-button.component';
import { TypeUser } from '../custom-radio-button/types/enum/typeUser';
import { RadioButtons } from '../custom-radio-button/types/interface/radioButton';
import { StepService } from '../stepper/service/step.service';

@Component({
  selector: 'registration-type',
  imports: [CustomRadioButtonComponent, ButtonsComponent],
  templateUrl: './registration-type.component.html',
  styleUrl: './registration-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationTypeComponent {
  radioButtons = signal<RadioButtons[]>(this.generatorRadioButtonConfig());

  buttonNext: ButtonConfig = {
    text: 'Далее',
    borderStyle: 'none',
  };

  buttonLast: ButtonConfig = {
    text: 'Назад',
    borderStyle: 'none',
  };

  client_type: UserType = {
    client_type: 'payer',
    currentComponent: RegistrationTypeComponent,
  };
  disabledBtn: boolean = true;

  readonly #stepService = inject(StepService);
  readonly #store = inject(Store);

  generatorRadioButtonConfig(): RadioButtons[] {
    const typeValue = Object.values(TypeUser);

    return typeValue.map((name) => ({
      icon: 'checkbox',
      name,
      checked: false,
      id: uuid.v4(),
    }));
  }

  userChoice(userBtn: RadioButtons) {
    this.updateClientType(userBtn.name);
    this.updateButtonState();
  }

  nextStep() {
    this.#store.dispatch(new UpdateUser(this.client_type));
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
    this.client_type = {
      client_type: user as keyof typeof TypeUser,
      currentComponent: RegistrationTypeComponent,
    };
  }
}
