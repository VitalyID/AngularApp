import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LocalStorigeService } from '../../services/local-storige.service';
import { InputConfig } from '../../shared/components/input-text/types/interfaces/dataInput';

import { AuthUser } from '../../state/cards/cards.action';
import { UserData } from '../../state/cards/cards.state';
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

  buttonData: ButtonConfig = {
    text: 'Продолжить',
    background: 'linear-gradient(0deg, #EEEFF2, #EEEFF2), #E7E9F0',
    borderRadius: '46px',
    color: '#55595B',
  };

  readonly #lSS = inject(LocalStorigeService);
  // readonly #getToken = inject(AuthService);
  readonly #store = inject(Store);
  readonly #router = inject(Router);

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

  ngOnInit(): void {
    this.userData.set(this.getLocalStorageData());
  }

  login() {
    // send userData to localStorage

    if (this.isSaveSwitcher()) {
      this.userData.update((oldValue) => ({
        ...oldValue,
        userCreated: new Date().toString(),
      }));
      this.#lSS.sendToLocalStorige(JSON.stringify(this.userData()));
    }

    const payload = {
      ...this.userData(),
      phone: this.userData().phone.replaceAll(/\D/g, '').replace(/^./, '+7'),
    };
    // in store we get token and navigate to main page
    this.#store.dispatch(new AuthUser(payload));
  }

  phoneNumber(phone: string) {
    // this.userData().phone = '+7' + phone;
    this.userData.update((oldPhone) => ({
      ...oldPhone,
      phone,
    }));
  }

  setPassword(pwd: string) {
    this.userData().password = pwd;
  }

  toggleSaveUser(isSaving: boolean) {
    if (!isSaving) {
      this.userData.update((oldPhone) => ({ ...oldPhone, phone: '' }));
      this.userData.update((oldPassword) => ({ ...oldPassword, password: '' }));
      this.userData.update((oldToken) => ({ ...oldToken, token: '' }));
      this.userData.update((oldDate) => ({ ...oldDate, userCreated: '' }));
    }
  }

  getLocalStorageData(): UserData {
    const localStorage = this.#lSS.getLocalStorige();
    if (localStorage) {
      try {
        return JSON.parse(localStorage);
      } catch {
        console.log('error reading localStarage: ', localStorage);
      }
    }
    return { phone: '', password: '', token: '', userCreated: '' };
  }
}

// in this realise, all user data is saving in local storige. It's need for correct work app.

// password need go out from local storide
