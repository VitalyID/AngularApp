import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BankCardNumberSpaces } from './pipe/card-number';

@Component({
  selector: 'bank-card',
  standalone: true,
  imports: [BankCardNumberSpaces],
  templateUrl: './bank-card.component.html',
  styleUrl: './bank-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankCardComponent {
  @Input({ required: true }) balance: number = 0;
  @Input({ required: true }) typeCard: string = '';
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) number: string = '0000000000000000';
  @Input({ required: true }) data: string = '';
}
