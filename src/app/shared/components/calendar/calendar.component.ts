import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'calendar',
  imports: [SvgIconComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  svgData: SvgSpriteSetting = {
    iconID: 'calendar',
    width: '24px',
    height: '24px',
  };
}
