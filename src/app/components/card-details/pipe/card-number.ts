import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bankCardNumber',
  standalone: true,
})
export class CardPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string | undefined {
    if (!value) return;
    return value.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}
