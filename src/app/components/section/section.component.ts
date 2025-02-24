import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionItem } from '../../types/interfaces/asideSVG';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';

@Component({
  selector: 'app-section',
  standalone: false,
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnChanges {
  @Input() item: SectionItem = {
    title: 'error name',
    icon: 'Error transmit child',
    ID: 999,
    route: 'error route',
  };
  @Input() routerLink: string = this.item.route;

  readonly #route = inject(ActivatedRoute);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      const activeFilter: string = '#54a75c';
      const defaultFilter: string = '#777d82';

      this.sectionIcons = {
        iconID: this.item.icon,
        width: '21px',
        height: '21px',
        fill:
          this.#route.snapshot.data['asideID'] === this.item.ID
            ? activeFilter
            : defaultFilter,
      };
    }
  }

  sectionIcons: SvgSpriteSetting = {
    iconID: this.item.icon,
    width: '21px',
    height: '21px',
  };
}
