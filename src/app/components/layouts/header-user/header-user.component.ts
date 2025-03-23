import { Component } from '@angular/core';
import { LanguageComponent } from '../../../shared/components/language/language.component';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';

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
