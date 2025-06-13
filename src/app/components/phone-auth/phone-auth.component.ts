import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorigeService } from '../../services/local-storige.service';
import { DataInput } from '../../shared/components/input-text/types/interfaces/dataInput';
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

  buttonData: ButtonConfig = {
    text: 'Продолжить',
    background: 'linear-gradient(0deg, #EEEFF2, #EEEFF2), #E7E9F0',
    borderRadius: '46px',
    color: '#55595B',
  };

  readonly #router = inject(Router);
  readonly #lSS = inject(LocalStorigeService);

  storigePhone = signal(this.#lSS.getLocalStorige());

  userInput: DataInput = {
    placeholder: '+7 ( ___ ) ___-__-__',
    value: this.storigePhone(),
    unitCurrency: '',
    type: 'number',
    disabled: false,
  };

  login() {
    console.log('CLICK');
    this.#router.navigate(['']);
  }

  phoneNumber(phone: string) {
    this.userPhone = phone;
  }

  isSavePhone(isSaving: boolean) {
    if (isSaving) {
      this.#lSS.sendToLocalStorige(this.userPhone);
    } else {
      this.#lSS.sendToLocalStorige((this.userPhone = ''));
    }
  }
}
