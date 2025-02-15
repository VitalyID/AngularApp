import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// import { SortDataService } from '../filter/service/filter.component.service';
import { SvgSpriteSetting } from './../../types/interfaces/svgIcon';

@Component({
  selector: 'svg-icon',
  imports: [CommonModule],
  template: `<svg
    *ngIf="svgSetting"
    [style.width]="svgSetting.width"
    [style.height]="svgSetting.height"
    [style.fill]="isActive ? 'red' : '#777d82'"
  >
    <use
      attr.xlink:href="/assets/icons/svg-sprite/symbol-defs.svg#{{
        svgSetting.iconID
      }}"
    ></use>
  </svg>`,
  styleUrl: './svg-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  @Input({ required: true }) svgSetting!: SvgSpriteSetting;
  @Input({ required: true }) isActive: boolean = false;

  // readonly #filterService = inject(SortDataService);

  constructor() {}
}
