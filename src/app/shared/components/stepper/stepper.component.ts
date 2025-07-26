import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { RegistrationStep } from '../../../types/enums/registrationStep';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { RegistrationCardComponent } from '../registration-card/registration-card.component';
import { RegistrationTypeComponent } from '../registration-type/registration-type.component';
import { RegistrationFormComponent } from '../restration-form/registration-form.component';
import { StepperConfig } from './types/interfaces/stepperConfig';

@Component({
  selector: 'stepper',
  imports: [CommonModule, ButtonsComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) propsForHostContent: Type<any>[] = [];
  @Output() userCreated = new EventEmitter<boolean>();

  @ViewChild('stepContent', { read: ViewContainerRef })
  hostContentRef!: ViewContainerRef;

  buttonBack: ButtonConfig = {
    text: 'Назад',
    borderStyle: 'none',
  };

  buttonNext: ButtonConfig = {
    text: 'Далее',
    borderStyle: 'none',
  };

  step: number = 0;
  stepperConfig: WritableSignal<StepperConfig[]> = signal([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propsForHostContent']) {
      this.stepperConfig.set(this.generateConfig());
    }
  }

  ngAfterViewInit(): void {
    this.hostContentRef.clear();
    this.changeComponent();
  }

  lastStep() {
    this.step--;
    this.changeActiveStep();
    this.changeComponent();
  }

  nextStep() {
    this.step++;
    this.changeActiveStep();
    this.changeComponent();
  }

  generateConfig(): StepperConfig[] {
    const generateConf: StepperConfig[] = [];
    this.propsForHostContent.forEach((component, index) =>
      generateConf.push({
        component: component,
        stepNumber: index,
        isActive: index === 0,
        stepperEnd: false,
      }),
    );

    return generateConf;
  }

  changeComponent() {
    switch (this.step) {
      case RegistrationStep.PERSONAL_INFO:
        this.hostContentRef.clear();
        this.hostContentRef.createComponent(RegistrationFormComponent);
        break;
      case RegistrationStep.ACCOUNT_TYPE:
        this.hostContentRef.clear();
        this.hostContentRef.createComponent(RegistrationTypeComponent);
        break;
      case RegistrationStep.PAYMENT_DETAILS:
        this.hostContentRef.clear();
        this.hostContentRef.createComponent(RegistrationCardComponent);
        break;
    }
  }

  changeActiveStep() {
    this.stepperConfig.update((currentStepperConfig) => {
      const resultStep = currentStepperConfig.map((el, index) => {
        const isActive = this.step >= index;
        const stepperEnd = this.step > index;

        return {
          ...el,
          isActive,
          stepperEnd,
        };
      });

      return resultStep;
    });
  }
}
