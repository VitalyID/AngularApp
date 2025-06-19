import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
// import { Router } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LocalStorigeService } from '../../services/local-storige.service';
import { DataInput } from '../../shared/components/input-text/types/interfaces/dataInput';
import { AuthUser } from '../../state/cards.action';
import { ButtonConfig } from '../../types/interfaces/sectionItem';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';

@Component({
  selector: 'phone-auth',
  standalone: false,
  templateUrl: './phone-auth.component.html',
  styleUrl: './phone-auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneAuthComponent {
  svgLogo: SvgSpriteSetting = {
    iconID: 'icon-logo',
    width: '98px',
    height: '31px',
  };

  isSaveLogin = signal<boolean>(true);
  userPhone: string = '';
  userPass: string = '';

  buttonData: ButtonConfig = {
    text: 'Продолжить',
    background: 'linear-gradient(0deg, #EEEFF2, #EEEFF2), #E7E9F0',
    borderRadius: '46px',
    color: '#55595B',
  };

  // readonly #router = inject(Router);
  readonly #lSS = inject(LocalStorigeService);
  // readonly #getToken = inject(AuthService);
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  storigePhone = signal(this.#lSS.getLocalStorige());

  inputPhone: DataInput = {
    placeholder: '+7 ( ___ ) ___-__-__',
    value: this.storigePhone(),
    unitCurrency: '',
    type: 'tel',
    disabled: false,
    mask: '0 (000) 000-00-00',
  };

  inputPassword: DataInput = {
    placeholder: 'Пароль',
    value: '',
    type: 'password',
    disabled: false,
  };

  login() {
    this.#store.dispatch(new AuthUser(this.userPhone, this.userPass));
    this.#router.navigate(['']);
  }

  phoneNumber(phone: string) {
    this.userPhone = '+7' + phone.replace(/\D/g, '');
  }

  setPassword(pwd: string) {
    this.userPass = pwd;
  }

  isSavePhone(isSaving: boolean) {
    // if (isSaving) {
    //   this.#lSS.sendToLocalStorige(this.userPhone);
    // } else {
    //   this.#lSS.sendToLocalStorige((this.userPhone = ''));
    // }
  }
}
