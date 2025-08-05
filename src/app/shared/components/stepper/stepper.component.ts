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
import { StepService } from './service/step.service';
import { StepperConfig } from './types/interfaces/stepperConfig';

@Component({
  selector: 'stepper',
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements AfterViewInit, OnChanges, OnInit {
  @Input({ required: true }) propsForHostContent: Type<any>[] = [];
  @Output() userCreated = new EventEmitter<boolean>();

  @ViewChild('stepContent', { read: ViewContainerRef })
  hostContentRef!: ViewContainerRef;

  step = signal<number>(0);
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
        this.step.set(step);
        this.changeActiveStep();
        if (this.step() === this.stepperConfig().length) {
          this.#popupService.popupState$.next({
            id: 'SetUser',
            state: false,
            component: null,
          });
          return;
        }
        this.changeComponent();
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
      stepperEnd: false,
    }));
  }

  changeComponent() {
    this.hostContentRef.clear();
    this.hostContentRef.createComponent(this.propsForHostContent[this.step()]);
  }

  changeActiveStep() {
    this.stepperConfig.update((currentStepperConfig) => {
      return currentStepperConfig.map((el, index) => {
        const isActive = this.step() >= index;
        const stepperEnd = this.step() > index;

        return {
          ...el,
          isActive,
          stepperEnd,
        };
      });
    });
  }
}
