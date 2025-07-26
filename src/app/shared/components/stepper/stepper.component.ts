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

  // debug: buttonBack: ButtonConfig = {
  // debug:   text: 'Назад',
  // debug:   borderStyle: 'none',
  // debug: };

  // debug: buttonNext: ButtonConfig = {
  // debug:   text: 'Далее',
  // debug:   borderStyle: 'none',
  // debug: };

  step: number = 0;
  stepperConfig: WritableSignal<StepperConfig[]> = signal([]);

  readonly #popupService = inject(PopupService);
  readonly #stepService = inject(StepService);
  readonly #destroyRef = inject(DestroyRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propsForHostContent']) {
      this.stepperConfig.set(this.generateConfig());
    }
  }

  ngOnInit(): void {
    // NOTE: get data from dynamic components(propsForHostContent: Type<any>[]) and send it to store
    this.#stepService.changeStep$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((step) => {
        this.step = step;
        this.changeActiveStep();
        if (this.step === this.stepperConfig().length) {
          this.#popupService.closePopup({
            id: 'SetUser',
            state: false,
            component: null,
          });
        } else {
          this.changeComponent();
        }
      });
  }

  ngAfterViewInit(): void {
    this.hostContentRef.clear();
    this.changeComponent();
    this.changeComponent();
  }

  // debug: lastStep() {
  // debug:   this.step--;
  // debug:   this.changeActiveStep();
  // debug:   this.changeComponent();
  // debug: }

  // debug: nextStep() {
  // debug:   this.step++;
  // debug:   this.changeActiveStep();

  //  debug:  if (this.step === this.stepperConfig().length) {
  //  debug:    this.#popupService.closePopup({
  //  debug:      id: 'SetUser',
  //  debug:      state: false,
  //  debug:      component: null,
  //  debug:    });
  //  debug:  } else {
  //  debug:    this.changeComponent();
  //  debug:  }
  // debug: }

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
    this.hostContentRef.clear();
    this.hostContentRef.createComponent(this.propsForHostContent[this.step]);
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
