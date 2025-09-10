import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TitleAside } from '../../../types/enums/titleAside';
import { SectionItem } from '../../../types/interfaces/asideSVG';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [RouterLink, SvgIconComponent, RouterModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SectionComponent {
  @Input() item: SectionItem = {
    title: 'error name',
    iconSetting: { iconID: 'Error transmit child' },
    ID: 999,
    route: 'error route',
  };
  @Input() routerLink: string = this.item.route;

  readonly #router = inject(Router);

  sectionIcons: SvgSpriteSetting = {
    iconID: this.item.iconSetting.iconID,
    width: '21px',
    height: '21px',
  };

  userClick(title: string) {
    if (title === TitleAside.logOut) {
      this.#router.navigate(['user-auth']);
    }
  }
}
