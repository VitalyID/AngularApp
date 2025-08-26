import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

import { debounceTime, map } from 'rxjs';
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
  readonly #cdr = inject(ChangeDetectorRef);

  userForm = this.#fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), letterNameValidator()],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(2), letterNameValidator()],
    ],
    email: ['', [Validators.required, Validators.email]],
    country: [this.countryDefaultValue],
    city: [this.cityDefaultValue],
  });

  ngOnInit(): void {
    this.createListDropdown('countries');
    this.userForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        debounceTime(300),
        map(() => this.userForm.value),
      )
      .subscribe((userInfo) => {
        this.user.first_name = userInfo.name ?? '';
        this.user.last_name = userInfo.lastName || '';
        this.user.email = userInfo.email || '';
        this.user.country = userInfo.country?.item.toString() || '';

        if (userInfo.country) {
          const country = userInfo.country.item.toString() || '';
          this.cityDropdownItems = this.createListDropdown('cities', country);
          this.cityDefaultValue = this.cityDropdownItems[0];
          this.#cdr.detectChanges();

          // NOTE: need this check, because list of city updating, but emitting to stepper old value

          const currentCity = this.userForm.get('city')?.value;
          const validCity = this.cityDropdownItems.some(
            (city) => currentCity?.item === city.item,
          );

          this.user.city = userInfo.city?.item.toString() || '';

          // NOTE: if we change country or city, update list of cities and users city
          if (!validCity) {
            this.userForm
              .get('city')
              ?.patchValue(this.cityDefaultValue, { emitEvent: false });

            this.user.city =
              this.userForm.get('city')?.value?.item.toString() ??
              this.cityDefaultValue.item.toString();
          }
        }

        if (this.userForm.valid) {
          this.#stepService.emitStepData$.next(this.user);
        }
      });

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
}
