import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import * as uuid from 'uuid';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { CustomRadioButtonComponent } from '../custom-radio-button/custom-radio-button.component';
import { TypeUser } from '../custom-radio-button/types/enum/typeUser';
import {
  RadioButtonConfig,
  RadioButtons,
} from '../custom-radio-button/types/interface/radioButton';
import { StepService } from '../stepper/service/step.service';

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

  client_type = signal('');
  disabled: boolean = true;

  readonly #stepService = inject(StepService);

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
    this.disabled = false;
  }

  nextStep() {
    this.#stepService.changeStep$.next(2);
  }

  lastStep() {
    this.#stepService.changeStep$.next(0);
  }
}
