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
  @Input({ required: true }) actualData?: DataInput;

  constructor() {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputValue = event.target.value;

    if (!this.actualData?.validationFrom) return;
    if (!this.actualData?.validationTo) return;

    if (
      Number(inputValue) < Number(this.actualData.validationFrom) ||
      Number(inputValue) > Number(this.actualData.validationTo)
    ) {
      event.target.value = this.actualData.placeholder;
    }
  }
}
