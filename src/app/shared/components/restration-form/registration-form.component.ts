import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
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
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import {
  RadioButtonConfig,
  RadioButtons,
} from '../custom-radio-button/types/interface/radioButton';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ListDropdown } from '../dropdown/types/interface/listDropdown';
import { letterNameValidator } from '../input-text/directives/validators/noNumbersInNameValidator';
import { InputTextComponent } from '../input-text/input-text.component';

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

  buttonBack: ButtonConfig = {
    text: 'Назад',
    borderStyle: 'none',
  };

  buttonNext: ButtonConfig = {
    text: 'Далее',
    borderStyle: 'none',
  };

  // NOTE: for change types user you need to change enum with types
  RadioButtonConfig!: WritableSignal<RadioButtons>;
  radioButtons: RadioButtonConfig[] = [];

  first_name = signal('');
  last_name = signal('');
  email = signal('');
  country = signal('');
  city = signal('');

  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);
  // debug: readonly #userInfoService = inject(UserInfoService);

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
    // NOTE: open popup if the registration component send true to service
    this.userForm
      .get('name')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userName) => {
        if (userName) {
          this.first_name.set(userName);
        }
      });

    this.userForm
      .get('lastName')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userLastName) => {
        if (userLastName) {
          this.last_name.set(userLastName);
        }
      });

    this.userForm
      .get('email')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((email) => {
        if (email) {
          this.email.set(email);
        }
      });

    this.userForm
      .get('country')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userCountry: ListDropdown | null) => {
        if (userCountry) {
          this.country.set(userCountry.item.toString());
          this.cityDropdownItems = this.createListDropdown(
            'cities',
            String(this.country()),
          );
          this.cityDefaultValue = this.cityDropdownItems[0];
        }
      });

    this.userForm
      .get('city')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userCity: ListDropdown | null) => {
        if (userCity) {
          this.city.set(userCity.item.toString());
        }
      });

    this.createListDropdown('countries');
  }

  createListDropdown(
    data: 'countries' | 'cities',
    fromCountry: string = 'USA',
  ): ListDropdown[] {
    const list: any = [];

    if (data === 'countries') {
      const countries = Object.keys(ListOfService).sort();
      countries.forEach((country) => {
        list.push({ id: uuid.v4(), item: country });
      });
      return list;
    } else {
      const cities = ListOfService[fromCountry];

      cities.forEach((city) => {
        list.push({ id: uuid.v4(), item: city });
      });

      return list;
    }
  }
}
