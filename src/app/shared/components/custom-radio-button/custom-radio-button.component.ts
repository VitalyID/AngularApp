import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
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
  @Input() radioConfig: RadioButtons[] = [
    {
      icon: '',
      name: '',
      checked: false,
      id: '',
    },
  ];

  @Output() userConfiture = new EventEmitter();

  setUser(setUserRadioBtn: RadioButtons) {
    this.radioConfig.map((btn) => {
      if (btn.id === setUserRadioBtn.id) {
        btn.icon = 'checkboxActive';
        btn.checked = true;
      }
    });

    this.userConfiture.emit(setUserRadioBtn);
  }
}
