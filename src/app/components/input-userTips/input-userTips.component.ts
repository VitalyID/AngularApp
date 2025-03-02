import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'input-userTips',
  imports: [NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './input-userTips.component.html',
  styleUrl: './input-userTips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUserTipsComponent),
      multi: true,
    },
  ],
})
export class InputUserTipsComponent implements ControlValueAccessor {
  @Input() formControl!: FormControl;

  // Внутреннее значение компонента
  value: any;

  // Функции, которые будут вызваны при изменении значения
  onChange: any = () => {};
  onTouched: any = () => {};

  // Метод, вызываемый Angular для установки значения
  writeValue(value: any): void {
    this.value = value;
    this.onChange(this.value);
    console.log(value);
  }

  // Метод, вызываемый Angular для регистрации функции обратного вызова при изменении значения
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Метод, вызываемый Angular для регистрации функции обратного вызова при "касании" элемента
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // // Метод, вызываемый Angular для отключения элемента (если нужно)
  // setDisabledState?(isDisabled: boolean): void {
  //   // Логика для отключения элемента, если требуется
  // }

  // Метод для обновления значения при изменении ввода
  updateValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
    console.log(value);
  }
}
