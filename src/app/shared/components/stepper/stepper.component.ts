import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { StepperConfig } from './types/interfaces/stepperConfig';

@Component({
  selector: 'stepper',
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @Input() stepperData = signal<StepperConfig[]>([
    { stepNumber: 0, isActive: false },
  ]);

  lastActiveStep() {
    let count: number = 0;
    const isActiveArr = this.stepperData().map((key) => key.isActive);
    isActiveArr.forEach((isActive) => {
      if (isActive) {
        count++;
      }
    });
    return count;
  }
}
