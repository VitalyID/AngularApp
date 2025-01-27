import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// import { TitleFilter } from '../../types/enums/nameFilter';
// import { TableComponent } from '../table/table.component';

@Component({
  selector: 'filter',
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  @Input() title_filter: string = '';
}
