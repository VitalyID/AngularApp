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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PopupService } from '../../../services/popup.service';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { StepService } from './service/step.service';
import { StepperConfig } from './types/interfaces/stepperConfig';

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
  // debug: readonly #store = inject(Store);

  step = signal<number>(0);
  stepperConfig: WritableSignal<StepperConfig[]> = signal([]);
  disabledBtn: boolean = true;

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
      console.log('debug:', this.generateConfig());

      this.stepperConfig.set(this.generateConfig());
    }
  }

  ngOnInit(): void {
    this.#stepService.changeStep$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((step: StepperConfig) => {
        this.step.set(step.stepNumber);
        this.updateActiveStep();
        if (this.step() === this.stepperConfig().length) {
          this.#popupService.popupState$.next({
            state: false,
            component: null,
          });
          return;
        }
        this.changeComponent();
      });

    this.#stepService.emitStepData$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((dataStep) => {
        this.step.update((step) => step + 1);
        this.disabledBtn = false;
        console.log('debug in step 2', dataStep);
      });
  }

  ngAfterViewInit(): void {
    this.changeComponent();
  }

  generateConfig(): StepperConfig[] {
    return this.propsForHostContent.map((component, index) => ({
      component: component,
      stepNumber: index,
      steps: this.propsForHostContent.length,
      isActive: index === 0,
      stepperEndLine: false,
    }));
  }

  changeComponent() {
    if (!this.hostContentRef) return;

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

  nextStep() {
    // debug: this.#store.dispatch(new UpdateUser(this.client_type));
    // debug: this.#stepService.changeStep$.next(2);
  }

  lastStep() {}
}
