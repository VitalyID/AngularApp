import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<svg
    [style.width]="width"
    [style.height]="height"
    [style.fill]="fill"
    [style.disabled]="disabled"
  >
    <use
      attr.xlink:href="assets/icons/svg-sprite/symbol-defs.svg#{{ iconID }}"
    ></use>
  </svg>`,
  styleUrl: './svg-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  @Input({ required: true }) iconID: string = '';
  @Input() width?: string = '';
  @Input() height?: string = '';
  @Input() fill?: string = '';
  @Input() disabled?: boolean = false;
}
