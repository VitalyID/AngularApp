import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bankCardNumberSpaces',
  standalone: true,
})
export class BankCardNumberSpaces implements PipeTransform {
  transform(value: string): string {
    if (!value?.length) return '';
    const strValue = value.toString();
    return strValue.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}
