import { Component } from '@angular/core';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { LanguageComponent } from '../../language/language.component';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [SvgIconComponent, LanguageComponent],
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
