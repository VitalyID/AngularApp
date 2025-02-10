import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { TransmitDataService } from '../../../services/transmit-data.service';
import { CheckFilter } from '../types/interface/checkFilter';
import { DataUserOperation } from './../../../types/sectionItem';

@Injectable({ providedIn: 'root' })
export class SortDataService {
  #defaultFilter: CheckFilter = {
    nameFilter: 'date',
    type: 'Up',
  };

  // innerService transmitted default or user filter into sort fn start
  #innerService = new BehaviorSubject<CheckFilter>(this.#defaultFilter);

  readonly #dataFromService = inject(TransmitDataService);

  #aboutTips!: DataUserOperation[];
  sortedData$ = new BehaviorSubject<DataUserOperation[]>(this.#aboutTips);

  constructor() {
    this.#dataFromService.dataObject$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.#aboutTips = [...data];
        console.log(this.#aboutTips);
        this.sortedData$.next(this.#aboutTips);
      });

    // get defaultFilter | userFilter by #innerService
    // we get here filter settings and data from server
    this.#innerService.pipe(takeUntilDestroyed()).subscribe((data) => {
      if (this.#aboutTips.length === 0) return;

      switch (data.nameFilter) {
        case 'date':
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
          // console.log(this.#aboutTips);
          this.sortedData$.next(this.#aboutTips);
          break;
        case 'country':
          this.#aboutTips.sort((a, b) => {
            return data.type === 'Up'
              ? a.country.localeCompare(b.country)
              : b.country.localeCompare(a.country);
          });
          this.sortedData$.next(this.#aboutTips);
          break;
        case 'tips':
          //console.log(111111111);

          this.#aboutTips.sort((a, b) => {
            const tipA = Number(a.tips.split(' ')[0]);
            const tipB = Number(b.tips.split(' ')[0]);

            return data.type === 'Up' ? tipA - tipB : tipB - tipA;
          });
          this.sortedData$.next(this.#aboutTips);
          break;
        case 'commission':
          this.#aboutTips.sort((a, b) => {
            const tipA = Number(a.tips.split(' ')[0]);
            const tipB = Number(b.tips.split(' ')[0]);

            return data.type === 'Up' ? tipA - tipB : tipB - tipA;
          });
          this.sortedData$.next(this.#aboutTips);
          break;
        case 'user':
          this.#aboutTips.sort((a, b) => {
            return data.type === 'Up'
              ? a.country.localeCompare(b.country)
              : b.country.localeCompare(a.country);
          });
          this.sortedData$.next(this.#aboutTips);
          break;
        case 'card':
          this.#aboutTips.sort((a, b) => {
            return data.type === 'Up'
              ? a.country.localeCompare(b.country)
              : b.country.localeCompare(a.country);
          });
          this.sortedData$.next(this.#aboutTips);
          break;
      }
    });
    // end
  }

  // get user filter and transmitting them
  changeUserFilter(data: CheckFilter) {
    this.#innerService.next(data);
  }
}
