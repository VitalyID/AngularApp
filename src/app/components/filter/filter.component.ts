import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SvgSpriteSetting } from './../../types/interfaces/svgIcon';
import { SortDataService } from './service/filter.component.service';
import { TitleFilter } from './types/enum/nameFilter';

@Component({
  selector: 'filter',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  @Input() titleFilter: string = '';
  @Input() userFilterFromParent: string = '';
  @Output() titleFilterFromChild = new EventEmitter<string>();

  readonly #sortDataService = inject(SortDataService);

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

  typeSVG: 'Up' | 'Down' = 'Up';

  private SortData(event: MouseEvent, type: 'Up' | 'Down') {
    const nameFilter = (event.target as HTMLElement)
      .closest('div.wrapFilter')
      ?.querySelector('span');

    if (nameFilter?.textContent) {
      let textContent: string = nameFilter?.textContent ?? '';
      // transmit data to parent for check color svg
      this.titleFilterFromChild.emit(textContent);
      // -------------------------------------------

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

  // ----------------------------------------------------------

  clickSort(event: MouseEvent, typeSVG: 'Up' | 'Down') {
    this.SortData(event, typeSVG);
    this.typeSVG = typeSVG;
  }

  // ----------------------------------------------------------

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.titleFilterFromChild.emit(TitleFilter.date);
  }
}
