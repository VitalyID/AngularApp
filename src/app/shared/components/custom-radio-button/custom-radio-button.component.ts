import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { RadioButtons } from './types/interface/radioButton';

@Component({
  selector: 'custom-radio-button',
  imports: [FormsModule, SvgIconComponent],
  templateUrl: './custom-radio-button.component.html',
  styleUrl: './custom-radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomRadioButtonComponent {
  @Input() radioConfig: RadioButtons = {
    icon: '',
    name: '',
    checked: false,
    id: '',
  };

  @Output() userConfiture = new EventEmitter();

  setUser(setUserRadioNtb: RadioButtons) {
    this.radioConfig = { ...this.radioConfig, icon: 'checkboxActive' };

    this.userConfiture.emit(setUserRadioNtb);
  }
}
