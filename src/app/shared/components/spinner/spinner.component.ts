import {
  ChangeDetectionStrategy,
  Component,
  effect,
  Input,
  signal,
  Signal,
} from '@angular/core';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'spinner',
  imports: [SvgIconComponent],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input() spinnerConfig: Signal<SvgSpriteSetting> = signal({
    iconID: '',
    isVisible: false,
  });

  constructor() {
    effect(() => {
      console.log('spinner', this.spinnerConfig().isVisible);
    });
  }
}
