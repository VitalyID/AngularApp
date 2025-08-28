import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as uuid from 'uuid';
import { ListOfService } from '../../../const';
import { UserPersonalInfo } from './../../../state/user/user.models';

import { DropdownComponent } from '../dropdown/dropdown.component';
import { ListDropdown } from '../dropdown/types/interface/listDropdown';
import { letterNameValidator } from '../input-text/directives/validators/noNumbersInNameValidator';
import { InputTextComponent } from '../input-text/input-text.component';
import { StepService } from '../stepper/service/step.service';
@Component({
  selector: 'registration-form',
  imports: [
    ReactiveFormsModule,
    DropdownComponent,
    FormsModule,
    InputTextComponent,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
  countryDropdownItems: ListDropdown[] = this.createListDropdown('countries');
  countryDefaultValue: ListDropdown = this.countryDropdownItems[0];
  cityDropdownItems: ListDropdown[] = this.createListDropdown('cities');
  cityDefaultValue: ListDropdown = this.cityDropdownItems[0];

  isFormInValid: boolean = true;

  user: UserPersonalInfo = {
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    city: '',
  };

  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);
  readonly #stepService = inject(StepService);

  userForm = this.#fb.group({
    first_name: [
      '',
      [Validators.required, Validators.minLength(3), letterNameValidator()],
    ],
    last_name: [
      '',
      [Validators.required, Validators.minLength(2), letterNameValidator()],
    ],
    email: ['', [Validators.required, Validators.email]],
    country: [this.countryDefaultValue],
    city: [this.cityDefaultValue],
  });

  subscribe(controlName: keyof UserPersonalInfo) {
    this.userForm
      .get(controlName)
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((control: ListDropdown | null | string) => {
        if (!control) return;
        if (this.isDropdown(control)) {
          if (controlName === 'country') {
            this.cityDropdownItems = this.createListDropdown(
              'cities',
              control.item.toString(),
            );
            this.cityDefaultValue = this.cityDropdownItems[0];

            this.user.country = control.item.toString();
          }

          if (controlName === 'city') {
            this.user.city = control.item.toString();
          }
        } else {
          this.user[controlName] = control;
        }

        this.#stepService.emitStepData$.next(this.user);
      });
  }

  ngOnInit(): void {
    this.createListDropdown('countries');

    this.subscribe('first_name');
    this.subscribe('last_name');
    this.subscribe('email');
    this.subscribe('country');
    this.subscribe('city');

    this.userForm.statusChanges
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.isFormInValid = !this.userForm.valid;
        this.#stepService.isFormInValid$.next(this.isFormInValid);
      });
  }

  createListDropdown(
    data: 'countries' | 'cities',
    fromCountry: string = 'USA',
  ): ListDropdown[] {
    if (data === 'countries') {
      const countries = Object.keys(ListOfService).sort();
      return countries.map((country) => ({ id: uuid.v4(), item: country }));
    } else {
      const cities = ListOfService[fromCountry];
      return cities.map((city) => ({ id: uuid.v4(), item: city }));
    }
  }

  isDropdown(type: any): type is ListDropdown {
    return (
      (type &&
        typeof type === 'object' &&
        'id' in type &&
        typeof type.id === 'string' &&
        'item' in type &&
        typeof type.item === 'string') ||
      typeof type.item === 'number'
    );
  }
}
