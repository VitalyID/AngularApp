import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataUserOperation } from '../../../types/sectionItem';
import { BordeerLineComponent } from '../bordeer-line/border-line.component';

@Component({
  selector: 'mobile-transaction-card',
  imports: [BordeerLineComponent, CommonModule],
  templateUrl: './mobile-transaction-card.component.html',
  styleUrl: './mobile-transaction-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileTransactionCardComponent {
  @Input() table: DataUserOperation = {
    data: '',
    tips: '',
    commission: '',
    country: '',
    email: '',
    card: '',
  };
}
