import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import * as uuid from 'uuid';

import { UserType } from '../../../state/user/user.models';
import { CustomRadioButtonComponent } from '../custom-radio-button/custom-radio-button.component';
import { TypeUser } from '../custom-radio-button/types/enum/typeUser';
import { RadioButtons } from '../custom-radio-button/types/interface/radioButton';
import { StepService } from '../stepper/service/step.service';

@Component({
  selector: 'registration-type',
  imports: [CustomRadioButtonComponent],
  templateUrl: './registration-type.component.html',
  styleUrl: './registration-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationTypeComponent {
  readonly #stepService = inject(StepService);

  radioButtons = signal<RadioButtons[]>(this.generatorRadioButtonConfig());

  client_type: UserType = {
    client_type: 'payer',
  };

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
  }

  getTypeUser(user: string) {
    const data = Object.entries(TypeUser);
    const [typeUser] = data.find(([key, value]) => value === user) || [];

    return typeUser;
  }

  updateClientType(data: string) {
    const user = this.getTypeUser(data);
    this.client_type = {
      client_type: user as keyof typeof TypeUser,
    };

    this.#stepService.emitStepData$.next(this.client_type);
    this.#stepService.isFormInValid$.next(false);
  }
}
