import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service';
import { StepperConfig } from '../../shared/components/stepper/types/interfaces/stepperConfig';

import * as uuid from 'uuid';
import { ListOfService } from '../../const';
import { TypeUser } from '../../shared/components/custom-check-box/types/enum/typeUser';
import {
  radioButtonConfig,
  RadioButtons,
} from '../../shared/components/custom-check-box/types/interface/radioButton';
import { ListDropdown } from '../../shared/components/dropdown/types/interface/listDropdown';
import { letterNameValidator } from '../../shared/components/input-text/directives/validators/noNumbersInNameValidator';
import { UserInfoService } from '../../state/user/userInfo.service';
import { ButtonConfig } from '../../types/interfaces/sectionItem';
import { UserInfo } from '../../types/interfaces/userInfo';

@Component({
  selector: 'user-profile-popup',
  standalone: false,
  templateUrl: './user-profile-popup.component.html',
  styleUrl: './user-profile-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePopupComponent implements OnInit {
  // NOTE: if user created, popup don't show
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
  ]);

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
  radioButtonConfig!: WritableSignal<RadioButtons>;
  radioButtons: radioButtonConfig[] = [];

  iconClose: string = 'icon-close';
  isOpen: boolean = false;

  userForm!: FormGroup;
  cardForm!: FormGroup;
  step: number = 0;
  nonFirstStep: boolean = false;

  first_name = signal('');
  last_name = signal('');
  email = signal('');
  country = signal('');
  city = signal('');
  user = signal({});
  client_type = signal('');
  card = signal({ card_number: '', expiry: '', cvc: '' });

  userConfig = computed<UserInfo>(() => ({
    first_name: this.first_name(),
    last_name: this.last_name(),
    email: this.email(),
    country: this.country(),
    city: this.city(),
    client_type: this.client_type(),
    card: this.card(),
  }));

  readonly #popupService = inject(PopupService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);
  readonly #userInfoService = inject(UserInfoService);

  ngOnInit(): void {
    this.radioButtonConfig = signal<RadioButtons>({
      icon: 'checkbox',
      iconActive: 'checkboxActive',
      button: this.generatorRadioButtonConfig(),
    });

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

    this.cardForm = this.#fb.group({
      card: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      data: ['', [Validators.required, Validators.minLength(4)]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });

    this.userForm
      .get('name')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userName) => {
        console.log('debug:', userName);

        this.first_name.set(userName);
        console.log('debug:', this.first_name());
      });

    this.userForm
      .get('lastName')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userLastName) => {
        this.last_name.set(userLastName);
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
      .subscribe((userCountry: ListDropdown) => {
        this.country.set(userCountry.item.toString());

        this.cityDropdownItems = this.createListDropdown(
          'cities',
          String(this.country()),
        );
        this.cityDefaultValue = this.cityDropdownItems[0];
      });

    this.cardForm
      .get('card')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((card) => {
        this.card.update((oldValue) => ({ ...oldValue, card_number: card }));
      });

    this.cardForm
      .get('data')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.card.update((oldValue) => ({ ...oldValue, expiry: data }));
      });

    this.cardForm
      .get('cvc')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((cvc) => {
        this.card.update((oldValue) => ({ ...oldValue, cvc: cvc }));
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

  closePopUp() {
    this.isOpen = false;
    // NOTE: send false by service to switch onn a scroll in home-component
    this.#popupService.setPopupState(false);
  }

  lastStep() {
    this.step--;
  }

  nextStep() {
    this.step++;

    console.log('debug:', this.userConfig());

    if (this.step < this.stepperData().length) {
      this.activateNextStep();
    } else if (this.step === this.stepperData().length) {
      this.completeStep();
      this.userCreated.emit(true);
      this.#userInfoService.postUserInfo(this.userConfig());
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

  generatorRadioButtonConfig(): radioButtonConfig[] {
    const typeValue = Object.values(TypeUser);

    typeValue.forEach((user) => {
      const newButtonConfig: radioButtonConfig = {
        name: user,
        checked: false,
        id: uuid.v4(),
      };

      this.radioButtons = [...this.radioButtons, newButtonConfig];
    });

    return this.radioButtons;
  }

  userChoice(data: string) {
    this.client_type.set(data);
  }
}
