import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SortDataService } from './service/filter.component.service';
import { TitleFilter } from './types/enum/nameFilter';

@Component({
  selector: 'filter',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
  @Input() titleFilter: string = '';
  @Input() userFilterFromParent: string[] = ['', ''];
  @Output() titleFilterFromChild = new EventEmitter<string[]>();

  readonly #sortDataService = inject(SortDataService);

  dataIconUp: SvgSpriteSetting = {
    iconID: 'icon-triangle-up',
    // width: '12px',
    // height: '12px',
    fill: '#777d82',
  };
  dataIconDown: SvgSpriteSetting = {
    iconID: 'icon-triangle-down',
    // width: '12px',
    // height: '12px',
    fill: '#777d82',
  };

  typeSVG: 'Up' | 'Down' = 'Up';
  #textContent: string = TitleFilter.date;

  ngOnInit(): void {
    this.titleFilterFromChild.emit([TitleFilter.date, 'Up']);
  }

  // change color icon, depending on click
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userFilterFromParent']) {
      const isSelected = this.userFilterFromParent[0] === this.titleFilter;

      const upFill = isSelected && this.typeSVG === 'Up' ? 'red' : '#777d82';
      const downFill =
        isSelected && this.typeSVG === 'Down' ? 'red' : '#777d82';

      this.dataIconUp = { ...this.dataIconUp, fill: upFill };
      this.dataIconDown = { ...this.dataIconDown, fill: downFill };
    }
  }

  private SortData(event: MouseEvent, type: 'Up' | 'Down') {
    this.typeSVG = type;
    const nameFilter = (event.target as HTMLElement)
      .closest('div.wrapFilter')
      ?.querySelector('span');

    if (nameFilter?.textContent) {
      this.#textContent = nameFilter?.textContent ?? '';
      // transmit data to parent for check color svg
      this.titleFilterFromChild.emit([this.#textContent, this.typeSVG]);
      // -------------------------------------------

      for (let item of Object.keys(TitleFilter)) {
        if (
          TitleFilter[item as keyof typeof TitleFilter] === this.#textContent
        ) {
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
}
