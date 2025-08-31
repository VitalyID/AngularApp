import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { PopupService } from '../../../services/popup.service';
import { UpdateUser } from '../../../state/user/user.action';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { StepService } from './service/step.service';
import { StepperConfig } from './types/interfaces/stepperConfig';
import {
  isUserCard,
  isUserPersonalInfo,
  isUserType,
} from './utils/registrationUtels';

@Component({
  selector: 'stepper',
  imports: [CommonModule, ButtonsComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements AfterViewInit, OnChanges, OnInit {
  @Input({ required: true }) propsForHostContent: Type<any>[] = [];
  @Output() userCreated = new EventEmitter<boolean>();

  @ViewChild('stepContent', { read: ViewContainerRef })
  hostContentRef!: ViewContainerRef;

  readonly #popupService = inject(PopupService);
  readonly #stepService = inject(StepService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #store = inject(Store);

  step = signal<number>(0);
  stepperConfig: WritableSignal<StepperConfig[]> = signal([]);

  // NOTE: All propsForHostContent must send boolean for correct work btn
  isFormValid = toSignal(this.#stepService.isFormInValid$);

  stepData: any = {};

  buttonNext: ButtonConfig = {
    text: 'Далее',
    borderStyle: 'none',
  };

  buttonLast: ButtonConfig = {
    text: 'Назад',
    borderStyle: 'none',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propsForHostContent']) {
      this.stepperConfig.set(this.generateConfig());
    }
  }

  ngOnInit(): void {
    this.#stepService.changeStep$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.updateActiveStep();
        setTimeout(() => {
          if (this.conditionClosePopup()) return;
        }, 300);

        this.changeComponent();
      });

    this.#stepService.emitStepData$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((dataStep) => {
        this.stepData = dataStep;
      });
  }

  ngAfterViewInit(): void {
    this.changeComponent();
  }

  generateConfig(): StepperConfig[] {
    return this.propsForHostContent.map((component, index) => ({
      component: component,
      stepNumber: index,
      isActive: index === 0,
      stepperEndLine: false,
    }));
  }

  changeComponent() {
    if (!this.hostContentRef) return;
    if (this.step() > this.propsForHostContent.length - 1) return;

    this.hostContentRef.clear();
    this.hostContentRef.createComponent(this.propsForHostContent[this.step()]);
  }

  updateActiveStep() {
    this.stepperConfig.update((currentStepperConfig) => {
      return currentStepperConfig.map((el, index) => {
        const isActive = this.step() >= index;
        const stepperEndLine = this.step() > index;

        return {
          ...el,
          isActive,
          stepperEndLine,
        };
      });
    });
  }

  conditionClosePopup(): boolean {
    if (this.step() === this.stepperConfig().length) {
      this.#popupService.popupState$.next({
        state: false,
        name: 'registrationUser',
        component: null,
      });
      return true;
    }
    return false;
  }

  nextStep() {
    // NOTE: because stepper can use for different situations, we are using narrow type for define stor and action

    if (
      isUserPersonalInfo(this.stepData) ||
      isUserType(this.stepData) ||
      isUserCard(this.stepData)
    ) {
      this.#store.dispatch(new UpdateUser(this.stepData));
      this.step.update((step) => step + 1);

      this.#stepService.changeStep$.next(this.step());
    }

    this.#stepService.isFormInValid$.next(true);
  }

  lastStep() {
    this.step.update((step) => step - 1);
    this.updateActiveStep();
    this.changeComponent();
  }
}
