import { Component, Input, ViewEncapsulation } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { ActivatedRoute } from '@angular/router';
// import { RoutIDservice } from '../../services/transmitDataRout.service';
import { RouterLink } from '@angular/router';
import { SectionItem } from '../../../types/interfaces/asideSVG';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [RouterLink, SvgIconComponent],
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

  sectionIcons: SvgSpriteSetting = {
    iconID: this.item.iconSetting.iconID,
    width: '21px',
    height: '21px',
  };
}
