import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { LocalStorigeService } from '../../services/local-storige.service';
import { InputConfig } from '../../shared/components/input-text/types/interfaces/dataInput';

import { PopupService } from '../../services/popup.service';
import { RegistrationCardComponent } from '../../shared/components/registration-card/registration-card.component';
import { RegistrationTypeComponent } from '../../shared/components/registration-type/registration-type.component';
import { RegistrationFormComponent } from '../../shared/components/restration-form/registration-form.component';
import { SpinnerService } from '../../shared/components/spinner/serices/spinner.service';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import {
  CreateUser,
  LoginUser,
  RefreshToken,
} from '../../state/auth/auth.action';
import { ButtonConfig } from '../../types/interfaces/sectionItem';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';

@Component({
  selector: 'phone-auth',
  standalone: false,
  templateUrl: './phone-auth.component.html',
  styleUrl: './phone-auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneAuthComponent implements OnInit {
  svgLogo: SvgSpriteSetting = {
    iconID: 'icon-logo',
    width: '98px',
    height: '31px',
  };

  isSaveSwitcher = signal<boolean>(true);
  isLoginPage: boolean = false;

  buttonDataRegister: ButtonConfig = {
    text: 'Зарегистрироваться',
    background: 'linear-gradient(0deg, #EEEFF2, #EEEFF2), #E7E9F0',
    borderRadius: '46px',
    color: '#55595B',
  };

  buttonDataLogin = signal<ButtonConfig>({
    text: 'Войти',
    background: 'linear-gradient(0deg, #EEEFF2, #EEEFF2), #E7E9F0',
    borderRadius: '46px',
    color: '#55595B',
    disabled: false,
  });

  readonly #lSS = inject(LocalStorigeService);
  readonly #store = inject(Store);
  readonly #route = inject(ActivatedRoute);
  readonly #spinner = inject(SpinnerService);
  readonly #popupService = inject(PopupService);

  userData = signal(this.getLocalStorageData());

  inputPhone: InputConfig = {
    placeholder: '+7 ( ___ ) ___-__-__',
    type: 'tel',
    disabled: false,
    dropSpecialCharacters: true,
    mask: '(000) 000-00-00',
    prefix: '+7',
    value: this.userData().phone,
  };

  inputPassword: InputConfig = {
    placeholder: 'Пароль',
    type: 'password',
    disabled: true,
  };

  spinnerConfig = computed(() => ({
    iconID: 'icon-spinner',
    isVisible: this.#spinner.spinnerState(),
  }));

  ngOnInit(): void {
    this.userData.set(this.getLocalStorageData());

    if (this.#route.snapshot.paramMap.get('login')) {
      this.isLoginPage = true;
    }
  }

  registration() {
    // NOTE: open popup in main page
    this.SavingUserData();
    this.#store.dispatch(new CreateUser(this.userData()));
    this.#popupService.popupState$.next({
      title: 'Идентификация аккаунта',
      id: 'SetUser',
      state: true,
      component: StepperComponent,
      componentProps: [
        RegistrationFormComponent,
        RegistrationTypeComponent,
        RegistrationCardComponent,
      ],
    });

    this.isLoginPage = true;
  }

  login() {
    this.SavingUserData();
    this.userData.update((oldValue) => {
      const newValue = { ...oldValue, silentMode: true };
      return newValue;
    });

    this.#store.dispatch(new LoginUser(this.userData()));

    setInterval(() => this.#store.dispatch(new RefreshToken()), 1200000);
    // debug: this.#router.navigate(['']);
  }

  SavingUserData() {
    if (this.isSaveSwitcher()) {
      this.userData.update((oldValue) => ({
        ...oldValue,
        userCreated: new Date().toString(),
      }));

      this.#lSS.sendToLocalStorige(JSON.stringify(this.userData()));
    }
  }

  phoneNumber(phone: string) {
    const newPhone = phone.replaceAll(/\D/g, '').replace(/^./, '+7');
    this.userData.update((oldPhone) => ({
      ...oldPhone,
      phone: newPhone,
    }));
  }

  setPassword(pwd: string) {
    this.userData().password = pwd;
  }

  toggleSaveUser(isSaving: boolean) {
    this.isSaveSwitcher.set(isSaving);
  }

  getLocalStorageData() {
    const localStorage = this.#lSS.getLocalStorige();
    if (localStorage) {
      try {
        // NOTE: silentMode - is control for spinner in refresh token
        return { ...JSON.parse(localStorage), silentMode: false };
      } catch {
        console.log('DEBUG: error reading localStarage: ', localStorage);
      }
    }
    return { phone: '', id: 0, token: '', tokenUpdated_at: '' };
  }
}
