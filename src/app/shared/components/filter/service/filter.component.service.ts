import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { TransmitDataService } from '../../../../services/transmit-data.service';
import { DataUserOperation } from '../../../../types/interfaces/userOperation';
import { CheckFilter } from './../types/interface/checkFilter';

@Injectable({ providedIn: 'root' })
export class SortDataService {
  readonly #dataFromService = inject(TransmitDataService);

  userFilter: CheckFilter = {
    nameFilter: 'date',
    type: 'Up',
  };

  #aboutTips: DataUserOperation[] = [];
  #innerService$ = new BehaviorSubject<CheckFilter>(this.userFilter);
  sortedData$ = new BehaviorSubject<DataUserOperation[]>(this.#aboutTips);
  totalFromService$ = new BehaviorSubject<string[]>([]);
  arrAmountTotal: string[] = [];

  dataOperationFromService$: Observable<DataUserOperation[]> = combineLatest([
    this.#dataFromService.dataObject$,
    this.#innerService$,
  ]).pipe(
    map(([getDataFromDateService, filter]) => {
      // NOTE: Counting Total and send them to table.component.ts
      this.getTotal(getDataFromDateService);
      this.totalFromService$.next(this.arrAmountTotal);

      return this.switch(getDataFromDateService, filter);
    })
  );

  // NOTE: get user filter and transmitting them
  changeUserFilter(data: CheckFilter) {
    this.#innerService$.next(data);
    this.userFilter = data;
  }

  // NOTE: this fn is filter type date, country etc.
  switch(arr: DataUserOperation[], data: CheckFilter): DataUserOperation[] {
    switch (data.nameFilter) {
      case 'date':
        {arr.sort((a, b) => {
          const dateA = new Date(
            a.data.split('.').reverse().join('-')
          ).getTime();
          const dateB = new Date(
            b.data.split('.').reverse().join('-')
          ).getTime();

          return data.type === 'Up' ? dateA - dateB : dateB - dateA;
        });

        this.sortedData$.next(arr);
        return arr;

        break;}
      case 'country':
        {arr.sort((a, b) => {
          return data.type === 'Up'
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        });
        this.sortedData$.next(arr);
        return arr;
}
      case 'tips':
        {arr.sort((a, b) => {
          const tipA = Number(a.tips.split(' ')[0]);
          const tipB = Number(b.tips.split(' ')[0]);

          return data.type === 'Up' ? tipA - tipB : tipB - tipA;
        });
        this.sortedData$.next(arr);
        return arr;
}
      case 'commission':
        {arr.sort((a, b) => {
          const tipA = Number(a.tips.split(' ')[0]);
          const tipB = Number(b.tips.split(' ')[0]);

          return data.type === 'Up' ? tipA - tipB : tipB - tipA;
        });
        this.sortedData$.next(arr);
        return arr;}
      case 'user':
        {arr.sort((a, b) => {
          return data.type === 'Up'
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        });
        this.sortedData$.next(arr);
        return arr;
}
      case 'card':
        {arr.sort((a, b) => {
          return data.type === 'Up'
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        });
        this.sortedData$.next(arr);
        return arr;
}
      default:
        console.error(`Unknown nameFilter: ${data.nameFilter}`);
        return arr;
    }
  }

  getTotal(data: DataUserOperation[]) {
    let amount = 0;
    let commission = 0;
    let bill = 0;
    let count = 0;

    this.arrAmountTotal = [];

    if (data && data.length > 0) {
      data.forEach((item) => {
        amount += Number(item.tips.split(' ')[0]);
        commission += Number(item.commission.split(' ')[0]);
        count++;
      });
      bill = amount / count;

      const amountLocalRU = this.#formatCurrent(amount);
      const commissionLocaleRU = this.#formatCurrent(commission);
      const billLocaleRU = this.#formatCurrent(bill);
      this.arrAmountTotal.push(amountLocalRU, commissionLocaleRU, billLocaleRU);
    }
  }

  #formatCurrent(data: number): string {
    return new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'RUB',
    }).format(data);
  }
}
