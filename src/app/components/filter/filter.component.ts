import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
// import { TitleFilter } from '../../types/enums/nameFilter';
// import { TableComponent } from '../table/table.component';

@Component({
  selector: 'filter',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  @Input() title_filter: string = '';
  dataIcon: SvgSpriteSetting = { iconID: 'filterArrow' };
}
