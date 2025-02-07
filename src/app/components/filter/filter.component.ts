import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SortDataService } from './service/filter.component.service';

@Component({
  selector: 'filter',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  readonly #sortDataService = inject(SortDataService);

  @Input() titleFilter: string = '';

  dataIconUp: SvgSpriteSetting = {
    iconID: 'icon-triangle-up',
    width: '12px',
    height: '12px',
    fill: '#777d82',
  };
  dataIconDown: SvgSpriteSetting = {
    iconID: 'icon-triangle-down',
    width: '12px',
    height: '12px',
    fill: '#777d82',
  };

  private SortData(event: MouseEvent, type: 'Up' | 'Down') {
    const nameFilter = (event.target as HTMLElement)
      .closest('div.wrapFilter')
      ?.querySelector('span');

    if (nameFilter?.textContent) {
      let textContent: string = nameFilter?.textContent;

      // objFromTextContent (CheckFilter, textContent)
      // function objFromTextContent ( obj: any, value: string) : string | undefined{
      //   for (let key of obj) {
      //     if (Object.hasOwnProperty(key)) {
      //       if (obj[key] === value ) {
      //         return key
      //       }
      //     }
      //   }
      //   return undefined
      // }
      this.#sortDataService.changeUserFilter({
        textContent: textContent,
        type: type,
      });
    } else {
      console.log("Name filter is null, it's err");
    }
  }

  clickSortUp(event: MouseEvent) {
    this.SortData(event, 'Up');
  }

  clickSortDown(event: MouseEvent) {
    this.SortData(event, 'Down');
  }
}
