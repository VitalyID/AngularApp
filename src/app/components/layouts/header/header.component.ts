import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoMenuComponent } from '../../../shared/components/logo-menu/logo-menu.component';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuData: SvgSpriteSetting = {
    iconID: 'menu',
    fill: 'black',
    width: '24px',
    height: '24px',
  };
  logoData: SvgSpriteSetting = {
    iconID: 'icon-logo',
    width: '98px',
    height: '31px',
    fill: 'black',
  };

  public headerLilnks: string[] = [
    'Получателям',
    'Бизнесу',
    'Плательщикам',
    'Агентам',
    'Поддержка',
  ];
}
