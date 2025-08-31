import { Pipe, PipeTransform } from '@angular/core';
import { insertSpace } from '../../../../types/utils/insertSpace';

@Pipe({
  name: 'bankCardNumberSpaces',
  standalone: true,
})
export class BankCardNumberSpaces implements PipeTransform {
  transform(value: string | null, ...args: any[]): string | undefined {
    if (!value) return ' ';
    const strValue = value.toString();
    return insertSpace(strValue);
  }
}
