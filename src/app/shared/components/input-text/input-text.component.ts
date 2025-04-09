import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { myValidatorDirective } from './directives/text-input.directive';
import { DataInput } from './types/interfaces/dataInput';

@Component({
  selector: 'input-text',
  imports: [ReactiveFormsModule, myValidatorDirective],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent {
  @Input() actualData: DataInput = {
    placeholder: '',
    value: '',
    unitCurrency: '',
    type: 'text',
    disabled: false,
  };
  @Output() updateValue = new EventEmitter();

  inputValue(data: Event) {
    const target = data.target as HTMLInputElement;
    this.updateValue.emit(target.value);
  }
}
