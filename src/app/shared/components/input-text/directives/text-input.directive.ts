import { Directive, HostListener, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { DataInput } from '../types/interfaces/dataInput';

@Directive({
  selector: '[myValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: myValidatorDirective,
      multi: true,
    },
  ],
})
export class myValidatorDirective {
  @Input({ required: true }) dataToInput?: DataInput;

  constructor() {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputValue = event.target.value;

    if (!this.dataToInput?.validationFrom) return;
    if (!this.dataToInput?.validationTo) return;

    if (
      Number(inputValue) < Number(this.dataToInput.validationFrom) ||
      Number(inputValue) > Number(this.dataToInput.validationTo)
    ) {
      event.target.value = this.dataToInput.placeholder;
    }
  }
}
