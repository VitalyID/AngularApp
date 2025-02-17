import { Component } from '@angular/core';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';

@Component({
  selector: 'app-header-user',
  standalone: false,

  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss',
})
export class HeaderUserComponent {
  userSetting: SvgSpriteSetting = {
    iconID: 'icon-user',
    width: '44px',
    height: '44px',
    fill: 'red',
  };
}
