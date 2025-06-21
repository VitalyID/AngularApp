import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { myValidatorDirective } from './directives/text-input.directive';
import { InputValidation } from './types/interfaces/dataInput';

@Component({
  selector: 'input-text',
  imports: [
    ReactiveFormsModule,
    myValidatorDirective,
    NgxMaskDirective,
    FormsModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent {
  @Input() type: 'number' | 'text' | 'tel' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() mask: string = '';
  @Input() dropSpecialCharacters: boolean | null = null;
  @Input() unitCurrency: string = '';
  @Input() validationSettings: InputValidation = {
    validationFrom: '',
    validationTo: '',
  };

  @Output() updateValue = new EventEmitter();

  inputValue(data: Event) {
    const target = data.target as HTMLInputElement;
    this.updateValue.emit(target.value);
  }
}
