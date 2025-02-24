import { Component, Input } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { ActivatedRoute } from '@angular/router';
// import { RoutIDservice } from '../../services/transmitDataRout.service';
import { SectionItem } from '../../types/interfaces/asideSVG';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';

@Component({
  selector: 'app-section',
  standalone: false,
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
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
