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
import { RadioButtonConfig, RadioButtons } from './types/interface/radioButton';

@Component({
  selector: 'custom-radio-button',
  imports: [FormsModule, SvgIconComponent],
  templateUrl: './custom-radio-button.component.html',
  styleUrl: './custom-radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomRadioButtonComponent {
  @Input() radioConfig = signal<RadioButtons>({
    icon: '',
    iconActive: '',
    button: [
      {
        name: '',
        checked: false,
        id: '',
      },
    ],
  });

  @Output() userConfiture = new EventEmitter();

  setUser(event: RadioButtonConfig) {
    const newRadioConfig = this.radioConfig();

    const newButtons = this.radioConfig().button.map((element) => {
      return { ...element, checked: element.name === event.name };
    });
    this.radioConfig.set({ ...newRadioConfig, button: newButtons });

    this.userConfiture.emit(event.name);
  }
}
