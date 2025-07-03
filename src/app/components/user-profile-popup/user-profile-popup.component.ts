import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StepperConfig } from '../../shared/components/stepper/types/interfaces/stepperConfig';

@Component({
  selector: 'user-profile-popup',
  standalone: false,
  templateUrl: './user-profile-popup.component.html',
  styleUrl: './user-profile-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePopupComponent {
  stepperData = signal<StepperConfig[]>([
    {
      stepNumber: 1,
      isActive: true,
    },
    {
      stepNumber: 2,
      isActive: true,
    },
    {
      stepNumber: 3,
      isActive: false,
    },
    {
      stepNumber: 4,
      isActive: false,
    },
    {
      stepNumber: 5,
      isActive: false,
    },
  ]);
}
