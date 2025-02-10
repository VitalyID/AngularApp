import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { TransmitDataService } from '../../../services/transmit-data.service';
import { DataUserOperation } from './../../../types/sectionItem';
import { CheckFilter } from './../types/interface/checkFilter';

@Injectable({ providedIn: 'root' })
export class SortDataService {
  #defaultFilter: CheckFilter = {
    nameFilter: 'date',
    type: 'Up',
  };

  readonly #dataFromService = inject(TransmitDataService);
  #aboutTips!: DataUserOperation[];
  sortedData$ = new BehaviorSubject<DataUserOperation[]>(this.#aboutTips);

  // innerService transmitted default or user filter into sort fn start
  #innerService = new BehaviorSubject<CheckFilter>(this.#defaultFilter);
  CheckFilter: CheckFilter = this.#defaultFilter;

  constructor() {
    this.#dataFromService.dataObject$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.#aboutTips = [...data];
        // call this fn for filter after click on tab, type today, lastday etc
        this.switch(this.#aboutTips, this.CheckFilter);
        // this.sortedData$.next(this.#aboutTips);
      });

    // get defaultFilter | userFilter by #innerService
    // we get here filter settings and data from server
    this.#innerService.pipe(takeUntilDestroyed()).subscribe((data) => {
      if (this.#aboutTips.length === 0) return;
      // call fn for filter data after click
      this.switch(this.#aboutTips, data);
    });
  }

  // get user filter and transmitting them
  changeUserFilter(data: CheckFilter) {
    this.#innerService.next(data);
  }

  // this fn is filter type date, country etc.
  switch(arr: DataUserOperation[], data: CheckFilter) {
    switch (data.nameFilter) {
      case 'date':
        // this.test('switch');
        arr.sort((a, b) => {
          const dateA = new Date(
            a.data.split('.').reverse().join('-')
          ).getTime();
          const dateB = new Date(
            b.data.split('.').reverse().join('-')
          ).getTime();

          return data.type === 'Up' ? dateA - dateB : dateB - dateA;
        });
        this.sortedData$.next(arr);

        break;
      case 'country':
        arr.sort((a, b) => {
          return data.type === 'Up'
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        });
        this.sortedData$.next(arr);

        break;
      case 'tips':
        arr.sort((a, b) => {
          const tipA = Number(a.tips.split(' ')[0]);
          const tipB = Number(b.tips.split(' ')[0]);

          return data.type === 'Up' ? tipA - tipB : tipB - tipA;
        });
        this.sortedData$.next(arr);

        break;
      case 'commission':
        arr.sort((a, b) => {
          const tipA = Number(a.tips.split(' ')[0]);
          const tipB = Number(b.tips.split(' ')[0]);

          return data.type === 'Up' ? tipA - tipB : tipB - tipA;
        });
        this.sortedData$.next(arr);

        break;
      case 'user':
        arr.sort((a, b) => {
          return data.type === 'Up'
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        });
        this.sortedData$.next(arr);

        break;
      case 'card':
        arr.sort((a, b) => {
          return data.type === 'Up'
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        });
        this.sortedData$.next(arr);

        break;
    }
  }
}
