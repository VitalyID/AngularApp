import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'bank-card',
  imports: [],
  templateUrl: './bank-card.component.html',
  styleUrl: './bank-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankCardComponent {
  @Input({ required: true }) balance: Signal<number> = signal(0);
  @Input({ required: true }) typeCard: Signal<string> = signal('');
  @Input({ required: true }) name: Signal<string> = signal('');
  @Input({ required: true }) number: Signal<string> = signal('');
  @Input({ required: true }) data: Signal<string> = signal('');
}
