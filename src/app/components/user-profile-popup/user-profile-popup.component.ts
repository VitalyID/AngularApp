import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PopupService } from '../../services/popup.service';
import { StepperConfig } from '../../shared/components/stepper/types/interfaces/stepperConfig';
import { ButtonConfig } from '../../types/interfaces/sectionItem';

@Component({
  selector: 'user-profile-popup',
  standalone: false,
  templateUrl: './user-profile-popup.component.html',
  styleUrl: './user-profile-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePopupComponent implements OnInit {
  stepperData = signal<StepperConfig[]>([
    {
      stepNumber: 1,
      isActive: true,
      stepperEnd: false,
    },
    {
      stepNumber: 2,
      isActive: false,
      stepperEnd: false,
    },
    {
      stepNumber: 3,
      isActive: false,
      stepperEnd: false,
    },
    {
      stepNumber: 4,
      isActive: false,
      stepperEnd: false,
    },
  ]);

  button: ButtonConfig = {
    text: 'Далее',
    borderStyle: 'none',
  };

  iconClose: string = 'icon-close';
  isOpen: boolean = false;
  userForm!: FormGroup;
  step: number = 0;

  readonly #popupService = inject(PopupService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);

  ngOnInit(): void {
    // NOTE: open popup if the registration component send true to service
    this.#popupService.popupState$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data: boolean) => {
        this.isOpen = data;
      });

    this.userForm = this.#fb.group({
      name: [''],
      lastName: [''],
      email: [''],
      country: [''],
      city: [''],
    });
  }

  closePopUp() {
    this.isOpen = false;
    // NOTE: send false by service to switch onn a scroll in home-component
    this.#popupService.setPopupState(false);
  }

  nextStep() {
    this.step++;

    if (this.step < this.stepperData().length) {
      this.activateNextStep();
    } else if (this.step === this.stepperData().length) {
      this.completeStep();
    }
  }

  activateNextStep() {
    this.stepperData.update((data) => {
      const newStepper = [...data];
      newStepper[this.step] = { ...newStepper[this.step], isActive: true };
      return newStepper;
    });
  }

  completeStep() {
    this.stepperData.update((data) => {
      const newStepper = [...data];
      newStepper[this.step - 1] = {
        ...newStepper[this.step - 1],
        stepperEnd: true,
      };
      return newStepper;
    });
    this.closePopUp();
  }
}
