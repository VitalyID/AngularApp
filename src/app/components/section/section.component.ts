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
      const fillActive = '#54a75c';
      const fillDefault = '#777d82';

      this.sectionIcons = {
        iconID: this.item.icon,
        fill:
          this.#route.snapshot.data['asideID'] === this.item.ID
            ? fillActive
            : fillDefault,
      };
    }
  }

  sectionIcons: SvgSpriteSetting = {
    iconID: this.item.icon,
  };
}
