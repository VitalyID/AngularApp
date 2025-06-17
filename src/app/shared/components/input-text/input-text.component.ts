import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { myValidatorDirective } from './directives/text-input.directive';
import { DataInput } from './types/interfaces/dataInput';

@Component({
  selector: 'input-text',
  imports: [ReactiveFormsModule, myValidatorDirective, NgxMaskDirective],
  providers: [provideNgxMask()],
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
    mask: '(000) 000-00-00',
    dropSpecialCharacters: false,
  };
  @Output() updateValue = new EventEmitter();

  inputValue(data: Event) {
    const target = data.target as HTMLInputElement;
    this.updateValue.emit(target.value);
  }
}
