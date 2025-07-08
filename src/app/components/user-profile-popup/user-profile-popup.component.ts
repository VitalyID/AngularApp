import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service';
import { StepperConfig } from '../../shared/components/stepper/types/interfaces/stepperConfig';

import * as uuid from 'uuid';
import { ListOfService } from '../../const';
import { ListDropdown } from '../../shared/components/dropdown/types/interface/listDropdown';
import { letterNameValidator } from '../../shared/components/input-text/directives/validators/noNumbersInNameValidator';
import { ButtonConfig } from '../../types/interfaces/sectionItem';

@Component({
  selector: 'user-profile-popup',
  standalone: false,
  templateUrl: './user-profile-popup.component.html',
  styleUrl: './user-profile-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePopupComponent implements OnInit {
  @Output() userCreated = new EventEmitter<boolean>();

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

  countryDropdownItems: ListDropdown[] = this.createListDropdown('countries');
  countryDefaultValue: ListDropdown = this.countryDropdownItems[0];
  cityDropdownItems: ListDropdown[] = [{ id: '', item: 'USA' }];
  cityDefaultValue: ListDropdown = { id: '', item: '' };

  button: ButtonConfig = {
    text: 'Далее',
    borderStyle: 'none',
  };

  iconClose: string = 'icon-close';
  isOpen: boolean = false;
  userForm!: FormGroup;
  step: number = 0;

  userName = signal('');
  userLastName = signal('');
  email = signal('');
  country = signal<ListDropdown>({ id: '', item: '' });
  city = signal<ListDropdown>({ id: '', item: '' });

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
      name: [
        '',
        [Validators.required, Validators.minLength(3), letterNameValidator()],
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(2), letterNameValidator()],
      ],
      email: ['', [Validators.required, Validators.email]],
      country: [''],
      city: [''],
    });

    this.userForm
      .get('name')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userName) => {
        this.userName.set(userName);
      });

    this.userForm
      .get('lastName')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userLastName) => {
        this.userLastName.set(userLastName);
      });

    this.userForm
      .get('email')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((email) => {
        this.email.set(email);
      });

    this.userForm
      .get('country')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userCountry) => {
        console.log('DEBUG', 11111);

        this.country.set(userCountry);
        console.log('DEBUG', userCountry, this.country());

        this.cityDropdownItems = this.createListDropdown(
          'cities',
          String(this.country().item),
        );
        this.cityDefaultValue = this.cityDropdownItems[0];
      });

    this.userForm
      .get('city')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((city) => {
        this.city.set(city);
      });

    this.createListDropdown('countries');
  }

  createListDropdown(
    data: 'countries' | 'cities',
    fromCountry: string = 'USA',
  ): ListDropdown[] {
    const list: any = [];
    console.log('DEBUG', data, fromCountry);

    if (data === 'countries') {
      const countries = Object.keys(ListOfService).sort();
      countries.forEach((country) => {
        list.push({ id: uuid.v4(), item: country });
      });
      return list;
    } else {
      console.log('DEBUG', fromCountry);

      const cities = ListOfService[fromCountry];
      console.log('DEBUG', cities);

      cities.forEach((city) => {
        list.push({ id: uuid.v4(), item: city });
      });
      console.log('DEBUG', list);

      return list;
    }
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
      this.userCreated.emit(true);
    }

    console.log(
      'debug',
      this.userName(),
      this.userLastName(),
      this.email(),
      this.country().item,
      this.city().item,
    );
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
