import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
// import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from '../../services/auth.service';
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
  readonly #getToken = inject(AuthService);
  readonly #store = inject(Store);

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
    console.log('CLICK');
    // this.#router.navigate(['']);
    // const userToken = this.#getToken
    //   .authUser(this.userPhone, this.userPass)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    // console.log(userToken);
    this.#store.dispatch(new AuthUser(this.userPhone, this.userPass));
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
