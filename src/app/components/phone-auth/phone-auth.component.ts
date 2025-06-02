import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DataInput } from '../../shared/components/input-text/types/interfaces/dataInput';
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

  isOn = signal<boolean>(true);

  userInput: DataInput = {
    placeholder: '+7 (___) ___-__-__',
    value: '',
    unitCurrency: '',
    type: 'number',
    disabled: false,
  };
}
