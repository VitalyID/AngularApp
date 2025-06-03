import { Directive, HostListener, Input } from '@angular/core';
import { DataInput } from '../types/interfaces/dataInput';

@Directive({
  selector: '[myValidator]',
  standalone: true,
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
      let numericValue = inputValue.replace(/[^0-9+]/g, '');

      if (numericValue.startsWith('8')) {
        numericValue = '+7' + numericValue.substring(1);
      }

      if (!numericValue) {
        event.target.value = '';
        return;
      }

      event.target.value = this.formatPhoneNumber(numericValue);
    }
  }

  private formatPhoneNumber(value: string): string {
    let cleaned = value.replace(/\D/g, '');

    let prefix = '';
    if (value.startsWith('+7')) {
      prefix = '+7';
      cleaned = cleaned.substring(1);
    } else if (value.startsWith('7')) {
      prefix = '+7';
      cleaned = cleaned.substring(1);
    } else if (value.length > 0 && cleaned.length > 0) {
      prefix = '+7';
    }

    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }

    let formatted = prefix;
    let i = 0;

    if (cleaned.length > i) {
      formatted += ' (';
      formatted += cleaned.substring(i, i + 3);
      i += 3;
      if (cleaned.length > i) {
        formatted += ') ';
      }
    }

    if (cleaned.length > i) {
      formatted += cleaned.substring(i, i + 3);
      i += 3;
      if (cleaned.length > i) {
        formatted += '-';
      }
    }

    if (cleaned.length > i) {
      formatted += cleaned.substring(i, i + 2);
      i += 2;
      if (cleaned.length > i) {
        formatted += '-';
      }
    }

    if (cleaned.length > i) {
      formatted += cleaned.substring(i, i + 2);
    }

    return formatted;
  }
}
