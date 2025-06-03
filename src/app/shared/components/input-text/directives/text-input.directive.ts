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

    if (this.actualData?.type === 'number') {
      if (!this.actualData?.validationFrom) return;
      if (!this.actualData?.validationTo) return;

      if (
        Number(inputValue) < Number(this.actualData.validationFrom) ||
        Number(inputValue) > Number(this.actualData.validationTo)
      ) {
        event.target.value = this.actualData.placeholder;
      }
    } else if (this.actualData?.type === 'tel') {
      // remove all no-numeral
      const numericValue = inputValue.replace(/[^0-9+]/g, '');

      const tmp: string[] = [...numericValue.split('')];

      if (tmp[0] === '8') {
        // if number begin +, removing it
        let formattedNumber = numericValue.replace(/^\+/, '');

        if (tmp.length === 1) {
          tmp.push(' (');
          event.target.value = tmp.join('');
        } else if (tmp.length === 4) {
          tmp.splice(1, 0, ' (');
          tmp.push(') ');
          event.target.value = tmp.join('');
        } else if (tmp.length === 7) {
          tmp.push(' - ');
          tmp.splice(1, 0, ' (');
          tmp.splice(5, 0, ') ');

          event.target.value = tmp.join('');
        } else if (tmp.length === 9) {
          tmp.push(' - ');
          tmp.splice(1, 0, ' (');
          tmp.splice(5, 0, ') ');
          tmp.splice(9, 0, ' - ');
          event.target.value = tmp.join('');
        } else if (tmp.length > 11) {
          event.target.value = '';
        }
      } else if (tmp[0] === '+') {
        if (tmp.length === 2) {
          tmp.push(' (');
          event.target.value = tmp.join('');
        } else if (tmp.length === 5) {
          tmp.splice(2, 0, ' (');
          tmp.push(') ');
          event.target.value = tmp.join('');
        } else if (tmp.length === 8) {
          tmp.push(' - ');
          tmp.splice(2, 0, ' (');
          tmp.splice(6, 0, ') ');

          event.target.value = tmp.join('');
        } else if (tmp.length === 10) {
          tmp.push(' - ');
          tmp.splice(2, 0, ' (');
          tmp.splice(6, 0, ') ');
          tmp.splice(10, 0, ' - ');
          event.target.value = tmp.join('');
        } else if (tmp.length > 12) {
          event.target.value = '';
        }
      }
    }
  }
}
