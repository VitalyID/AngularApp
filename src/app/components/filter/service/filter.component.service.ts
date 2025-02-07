import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { TransmitDataService } from '../../../services/transmit-data.service';
import { DataUserOperation } from './../../../types/sectionItem';
import { CheckFilter } from './../types/interface/checkFilter';

@Injectable({ providedIn: 'root' })
export class SortDataService {
  #defaultFilter: CheckFilter = {
    textContent: 'Дата',
    type: 'Up',
  };

  // innerService transmitted default or user filter into sort fn start
  #innerService = new BehaviorSubject<CheckFilter>(this.#defaultFilter);

  readonly #dataFromService = inject(TransmitDataService);

  #aboutTips?: DataUserOperation[];
  constructor() {
    this.#dataFromService.dataObject$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.#aboutTips = data;
      });

    // get defaultFilter | userFilter by #innerService
    // we get here filter settings and data from server
    this.#innerService.pipe(takeUntilDestroyed()).subscribe((data) => {
      console.log(data);
      console.log(this.#aboutTips);

      if (this.#aboutTips && data.textContent === 'Дата') {
        // console.log(this.#aboutTips[0].data);
        this.#aboutTips.sort((a, b) => {
          const dateA = new Date(
            a.data.split('.').reverse().join('-')
          ).getTime();
          const dateB = new Date(
            b.data.split('.').reverse().join('-')
          ).getTime();

          return data.type === 'Up' ? dateA - dateB : dateB - dateA;
        });
      } else if (this.#aboutTips && data.textContent === 'Страна') {
        this.#aboutTips.sort((a, b) => {
          return data.type === 'Up'
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        });
      } else if (this.#aboutTips && data.textContent === 'Размер чаевых') {
        this.#aboutTips.sort((a, b) => {
          const tipA = a.tips.slice(0, a.tips.length);
          const tipB = a.tips.slice(0, b.tips.length);

          return data.type === 'Up'
            ? a.tips.localeCompare(b.tips)
            : b.tips.localeCompare(a.tips);
        });
      }
    });

    // end
  }

  // get user filter and transmitting them
  changeUserFilter(data: CheckFilter) {
    this.#innerService.next(data);
  }
}
