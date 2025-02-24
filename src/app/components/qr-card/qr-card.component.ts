import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'qr-card',
  imports: [SvgIconComponent],
  templateUrl: './qr-card.component.html',
  styleUrl: './qr-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCardComponent {
  svgSetting: SvgSpriteSetting = {
    iconID: 'Path',
    width: '10px',
    height: '20px',
    fill: 'black',
  };
  svgSettingFooter1: SvgSpriteSetting = {
    iconID: 'icon-Chart',
    width: '24px',
    height: '24px',
    fill: 'black',
  };
  svgSettingFooter2: SvgSpriteSetting = {
    iconID: 'icon-share',
    width: '24px',
    height: '24px',
    fill: 'black',
  };
  svgSettingFooter3: SvgSpriteSetting = {
    iconID: 'icon-Edit',
    width: '24px',
    height: '24px',
    fill: 'black',
  };
  svgSettingFooter4: SvgSpriteSetting = {
    iconID: 'icon-delete',
    width: '24px',
    height: '24px',
    fill: 'black',
  };
}
