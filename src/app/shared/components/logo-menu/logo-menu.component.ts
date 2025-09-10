import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input
} from '@angular/core';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { StateMenuService } from './../../../services/state-menu';

@Component({
  selector: 'logo-menu',
  imports: [SvgIconComponent],
  templateUrl: './logo-menu.component.html',
  styleUrl: './logo-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMenuComponent {
  @Input() logoConfig: SvgSpriteSetting = {
    iconID: '',
    fill: '',
    width: '',
    height: '',
  };

  @Input() menuConfig: SvgSpriteSetting = {
    iconID: '',
    fill: '',
    width: '',
    height: '',
  };

  menuSetting: SvgSpriteSetting = {
    iconID: 'menu',
    fill: 'black',
    width: '24px',
    height: '24px',
  };
  logoSetting: SvgSpriteSetting = {
    iconID: 'icon-logo',
    width: '98px',
    height: '31px',
    fill: 'black',
  };

  readonly #servis = inject(StateMenuService);

  onClick(): void {
    this.#servis.stateMenuService.next(true);
  }
}
