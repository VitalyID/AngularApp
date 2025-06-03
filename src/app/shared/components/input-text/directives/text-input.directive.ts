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

      if (tmp[0] === '8' || tmp[0] === '+') {
        let newNumber: string[] = [];
        // if number begin +, removing it
        let formattedNumber = numericValue.replace(/^\+/, '');

        if (formattedNumber.length > 11) {
          event.target.value = 'ОШИБКА';
        }

        // change 8 to +7
        if (formattedNumber.startsWith('8')) {
          formattedNumber = '+7' + formattedNumber.slice(1);
        } else if (!formattedNumber.startsWith('+7')) {
          formattedNumber = '+7' + formattedNumber;
        }

        //  formatting number
        const areaCode = formattedNumber.substring(1, 4);
        const prefix = formattedNumber.substring(4, 7);
        const lineNumber = formattedNumber.substring(7, 9);
        const lastTwo = formattedNumber.substring(9, 11);

        console.log(`+7 (${areaCode}) ${prefix} - ${lineNumber} - ${lastTwo}`);

        event.target.value = `+7 (${areaCode}) ${prefix} - ${lineNumber} - ${lastTwo}`;
      } else {
        event.target.value = '';
      }
    }
  }
}
