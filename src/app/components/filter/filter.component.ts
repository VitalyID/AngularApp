import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SvgSpriteSetting } from './../../types/interfaces/svgIcon';
// import { SvgIconService } from './service/ svgIconActiv.component.service';
import { SortDataService } from './service/filter.component.service';
import { TitleFilter } from './types/enum/nameFilter';
import { svgActive } from './types/interface/svgActivIcon';

@Component({
  selector: 'filter',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  readonly #sortDataService = inject(SortDataService);
  // readonly #svgActiveService = inject(SvgIconService);

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

      for (let item of Object.keys(TitleFilter)) {
        if (TitleFilter[item as keyof typeof TitleFilter] === textContent) {
          this.#sortDataService.changeUserFilter({
            nameFilter: item,
            type: type,
          });
        }
      }
    } else {
      console.log("Name filter is null, it's err");
    }
  }

  classSVG: 'Up' | 'Down' = 'Up';
  clickSort(event: MouseEvent, from: 'Up' | 'Down') {
    this.SortData(event, from);
    // this.#svgActiveService.getClickFromFilter(event, from);
  }

  svgActive: svgActive[] = [];
  ngOnInit(): void {
    for (let item of Object.keys(TitleFilter)) {
      this.svgActive.push({
        nameFilter: item,
        up: '#777d82',
        down: '#777d82',
      });
    }
    // this.#svgActiveService.getSVGFromComponent(this.svgActive);
  }
}
