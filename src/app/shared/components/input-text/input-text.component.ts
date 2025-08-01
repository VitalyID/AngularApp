// NOTE: this component work in two mode: for template form and ControlValueAccess mode. This state controlled by parameter modeCVA. When it's 'true', cva-mode is active and component get/send data from FormControl

// NOTE: event 'focused' need for transmit to parent: to dirty input or clean for validdation

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
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
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputTextComponent),
    },
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent implements ControlValueAccessor, OnChanges {
  @Input() type: 'number' | 'text' | 'tel' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string | number = '';
  @Input() mask: string = '';
  @Input() prefix: string = '';
  @Input() dropSpecialCharacters: boolean | null = null;
  @Input() unitCurrency: string = '';
  @Input() validationSettings: InputValidation = {
    validationFrom: '',
    validationTo: '',
    minlength: 0,
  };

  @Output() updateValue = new EventEmitter();
  @Output() focused = new EventEmitter<boolean>();

  valueCVA: string | number = '';
  modeCVA: boolean = false;
  disabledState: boolean = false;

  // NOTE: when get data from parent and modeCVA=false
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      if (!this.modeCVA) {
        this.valueCVA = changes['value'].currentValue;
      }
    }
    if (changes['disabled']) {
      if (!this.modeCVA) {
        this.disabledState = this.disabled;
      }
    }
  }

  inputValue(data: Event) {
    const target = data.target as HTMLInputElement;

    if (this.modeCVA) {
      this.valueCVA = target.value;
      this.onChange(target.value);
    } else {
      this.updateValue.emit(target.value);
      this.valueCVA = target.value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.modeCVA = true;
  }
  registerOnTouched(fn: any): void {
    this.modeCVA = true;
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (data: string | number) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  writeValue(data: number | string): void {
    this.valueCVA = data;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.modeCVA) {
      this.disabledState = isDisabled;
    }
  }

  onFocus() {
    this.focused.emit(true);
  }

  onBlur() {
    this.onTouched();
    this.focused.emit(false);
  }
}
