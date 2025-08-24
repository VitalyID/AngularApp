import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import * as uuid from 'uuid';

import { UserType } from '../../../state/user/user.models';
import { ButtonsComponent } from '../buttons/buttons.component';
import { CustomRadioButtonComponent } from '../custom-radio-button/custom-radio-button.component';
import { TypeUser } from '../custom-radio-button/types/enum/typeUser';
import { RadioButtons } from '../custom-radio-button/types/interface/radioButton';

@Component({
  selector: 'registration-type',
  imports: [CustomRadioButtonComponent, ButtonsComponent],
  templateUrl: './registration-type.component.html',
  styleUrl: './registration-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationTypeComponent {
  radioButtons = signal<RadioButtons[]>(this.generatorRadioButtonConfig());

  client_type: UserType = {
    client_type: 'payer',
    currentComponent: RegistrationTypeComponent,
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
      currentComponent: RegistrationTypeComponent,
    };
  }
}
