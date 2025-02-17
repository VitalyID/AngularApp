import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';
import { SectionItem } from './../../types/sectionItem';

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
  };

  readonly #route = inject(ActivatedRoute);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      // console.log(this.item);
      this.sectionIcons = {
        iconID: this.item.icon,
        width: '21px',
        height: '21px',
        fill: '#777d82',
      };

      // change local style color for svg-icon
      if (this.#route.snapshot.data['asideID'] === this.item.ID) {
        this.sectionIcons = {
          iconID: this.item.icon,
          fill: '#54a75c',
          width: '21px',
          height: '21px',
        };
      }
    }
  }

  sectionIcons: SvgSpriteSetting = {
    iconID: this.item.icon,
    width: '21px',
    height: '21px',
  };
}
