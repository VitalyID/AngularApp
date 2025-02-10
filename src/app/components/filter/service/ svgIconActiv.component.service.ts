import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TitleFilter } from '../types/enum/nameFilter';
import { svgActive } from './../types/interface/svgActivIcon';
// import { svgActive } from '../types/interface/svgActivIcon';

@Injectable({ providedIn: 'root' })
export class SvgIconService {
  #FilterNameAndSVG: svgActive[] = [
    {
      nameFilter: '',
      up: '',
      down: '',
    },
  ];

  activeSVG = new BehaviorSubject<svgActive[]>(this.#FilterNameAndSVG);
  // svgArr: svgActive[];
  // get click from template
  getSVGFromComponent(data: svgActive[]) {
    data[0].up = 'red';
    console.log(data);
    this.#FilterNameAndSVG = data;
  }

  getClickFromFilter(data: MouseEvent, svg: string) {
    for (let item of Object.keys(TitleFilter)) {
      const nameFilter = (data.target as HTMLElement)
        .closest('div.wrapFilter')
        ?.querySelector('span')?.textContent;

      if (nameFilter === TitleFilter[item as keyof typeof TitleFilter]) {
        const indexArr = this.#FilterNameAndSVG.findIndex(
          (unit) => unit.nameFilter === item
        );
        svg === 'Up'
          ? (this.#FilterNameAndSVG[indexArr].up = 'red')
          : (this.#FilterNameAndSVG[indexArr].down = 'red');
      }
    }
    console.log(this.#FilterNameAndSVG);
  }

  constructor() {}
}
