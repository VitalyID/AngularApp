import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { DataInput } from '../../shared/components/input-text/types/interfaces/dataInput';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';
import { ButtonData } from './../../types/sectionItem';

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

  isOn = signal<boolean>(true);

  userInput: DataInput = {
    placeholder: '+7 (___) ___-__-__',
    value: '',
    unitCurrency: '',
    type: 'number',
    disabled: false,
  };

  buttonData: ButtonData = {
    text: 'Продолжить',
    id: uuid.v4(),
    background: 'linear-gradient(0deg, #EEEFF2, #EEEFF2), #E7E9F0',
    borderRadius: '46px',
    color: '#55595B',
  };

  readonly #router = inject(Router);

  onClick() {
    console.log('CLICK');
    this.#router.navigate(['']);
  }
}
