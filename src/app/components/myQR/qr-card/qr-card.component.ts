import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';

@Component({
  selector: 'qr-card',
  imports: [SvgIconComponent],
  templateUrl: './qr-card.component.html',
  styleUrl: './qr-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCardComponent implements OnInit {
  @Input({ required: true }) src: string = '';

  // readonly #qrService = inject(QRcodeService);

  ngOnInit(): void {}

  svgSetting: SvgSpriteSetting = {
    iconID: 'Path',
    width: '10px',
    height: '20px',
    fill: 'black',
  };
  svgChartIcon: SvgSpriteSetting = {
    iconID: 'icon-Chart',
    width: '24px',
    height: '24px',
    fill: 'black',
  };
  svgShareIcon: SvgSpriteSetting = {
    iconID: 'icon-share',
    width: '24px',
    height: '24px',
    fill: 'black',
  };
  svgEditIcon: SvgSpriteSetting = {
    iconID: 'icon-Edit',
    width: '24px',
    height: '24px',
    fill: 'black',
  };
  svgDeleteIcon: SvgSpriteSetting = {
    iconID: 'icon-delete',
    width: '24px',
    height: '24px',
    fill: 'black',
  };
}
