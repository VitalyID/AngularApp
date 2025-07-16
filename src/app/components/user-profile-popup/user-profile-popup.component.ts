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
import { UserInfoService } from '../../state/user/userInfo.service';
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

  iconClose: string = 'icon-close';
  isOpen: boolean = false;
  userForm!: FormGroup;
  step: number = 0;
  nonFirstStep: boolean = false;

  payerConfig = signal<boolean>(false);
  recipientConfig = signal<boolean>(false);
  agentConfig = signal<boolean>(false);
  busineccConfig = signal<boolean>(false);

  userName = signal('');
  userLastName = signal('');
  email = signal('');
  country = signal<ListDropdown>({ id: '', item: '' });
  city = signal<ListDropdown>({ id: '', item: '' });
  user = signal({});
  typesUser: Record<string, boolean> = {};

  readonly #popupService = inject(PopupService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);
  readonly #userInfoService = inject(UserInfoService);

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
        this.country.set(userCountry);

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

  userSettingCheckbox(typeUser: string, setUser: boolean) {
    console.log('debug', typeUser, setUser);

    switch (typeUser) {
      case 'payer':
        this.typesUser['payer'] = setUser;
        break;
      case 'recipient':
        this.typesUser['recipient'] = setUser;
        break;
      case 'agent':
        this.typesUser['agent'] = setUser;
        break;
      case 'businecc':
        this.typesUser['businecc'] = setUser;
        break;
    }
    console.log('debug', this.typesUser);
  }

  lastStep() {
    this.step--;
  }

  nextStep() {
    this.#userInfoService.userProfile.next({
      userName: this.userName(),
      userLastName: this.userLastName(),
      email: this.email(),
      country: this.country().item as string,
      city: this.city().item as string,
      user: this.typesUser,
    });

    this.step++;

    if (this.step < this.stepperData().length) {
      this.activateNextStep();
    } else if (this.step === this.stepperData().length) {
      this.completeStep();
      this.userCreated.emit(true);
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
