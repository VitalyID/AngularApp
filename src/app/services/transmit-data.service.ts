import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  retry,
  Subscription,
  throwError,
} from 'rxjs';
import { ButtonService } from '../components/buttons/service/buttons.component.service';
import {
  DataUserOperation,
  DateTimeUserOperations,
} from './../types/sectionItem';
import { GetDataService } from './get-data.service';

@Injectable({
  providedIn: 'root',
})
export class TransmitDataService implements OnDestroy {
  readonly #service = inject(ButtonService);
  readonly #getDataServer = inject(GetDataService);

  public dataUserOperations: DataUserOperation[] = [];
  arrDate: string[] = [];
  arrDateItem: string[] = [];

  private name: string = 'forMonth';
  private arrCorrectElements: DataUserOperation[] = [];
  private dateFromInput!: Subscription;
  #tmp?: DateTimeUserOperations;
  readonly #datePipe = inject(DatePipe);

  public dataObject$ = new BehaviorSubject<DataUserOperation[]>([]);

  getDataUserTab(name: string) {
    this.name = name;
    // this.transmitData(name);

    let arrUserActualOperations;

    switch (this.name) {
      case 'today':
        const filterToday = this.dataUserOperations.filter((item) => {
          this.arrDateItem = item.data.split('.');

          return (
            this.arrDate[0] === this.arrDateItem[0] &&
            this.arrDate[1] === this.arrDateItem[1] &&
            this.arrDate[2] === this.arrDateItem[2]
          );
        });
        this.dataObject$.next(filterToday);

        break;
      case 'yestarday':
        const today = new Date();
        const setYesterday = new Date(today.setDate(today.getDate() - 1));

        const filterYestarday = this.dataUserOperations.filter((item) => {
          const dataFromServerString = item.data.split('.').reverse().join('-');
          const dataFromServerObj = new Date(dataFromServerString);

          return (
            setYesterday.toLocaleString().split(',')[0] ===
            dataFromServerObj.toLocaleString().split(',')[0]
          );
        });
        this.dataObject$.next(filterYestarday);

        break;
      case 'forWeek':
        let dayWeek: number = new Date().getDay();

        // change number day in week
        dayWeek = dayWeek === 0 ? 6 : dayWeek - 1;
        // get first and end day of week
        const currentData = new Date();
        const startOfWeek = new Date(currentData);
        startOfWeek.setDate(currentData.getDate() - dayWeek);
        const dayOfWeek = new Date(currentData);
        dayOfWeek.setDate(currentData.getDate() - dayWeek + 6);
        // transform data in right format
        const startDayWeek = this.#datePipe.transform(
          startOfWeek,
          'dd.MM.yyyy'
        );
        const endDayWeek = this.#datePipe.transform(dayOfWeek, 'dd.MM.yyyy');

        if (!startDayWeek || !endDayWeek) return;

        const arrStartWeek = startDayWeek.split('.');
        const arrEndWeek = endDayWeek.split('.');

        // EndDay
        const filterWeek = this.dataUserOperations.filter((item) => {
          const arrData = item.data.split('.');

          return (
            +arrData[2] >= +arrStartWeek[2] &&
            +arrData[2] <= +arrEndWeek[2] &&
            +arrData[1] >= +arrStartWeek[1] &&
            +arrData[1] <= +arrEndWeek[1] &&
            +arrData[0] >= +arrStartWeek[0] &&
            +arrData[0] <= +arrEndWeek[0]
          );
        });
        console.log('hvbfhvbfbv', filterWeek);
        this.dataObject$.next(filterWeek);

        break;
      case 'forMonth':
        const arrOperationsForMonth = this.dataUserOperations.filter((item) => {
          return Number(item.data.split('.')[1]) === Number(this.arrDate[1]);
        });
        this.dataObject$.next(arrOperationsForMonth);

        break;
      case 'forLastMonth':
        new Date().setMonth(-1);

        const arrOperationsForLastMonth = this.dataUserOperations.filter(
          (item) => {
            return Number(item.data.split('.')[1]) === new Date().getMonth();
          }
        );

        this.dataObject$.next(arrOperationsForLastMonth);

        break;
      case 'forPeriod':
        this.dateFromInput = this.#service.DateFromInput$.subscribe((data) => {
          this.#tmp = data.obj as DateTimeUserOperations;

          let dataStart = new Date(this.#tmp.dateFrom);
          let dataEnd = new Date(this.#tmp.dateEnd);

          arrUserActualOperations = this.dataUserOperations.filter((item) => {
            console.log(item);

            const regex = /(\d{2})\.(\d{2})\.(\d{4})/;
            const match = item.data.match(regex);

            let dataActual;
            if (match) {
              const day = match[1];
              const month = match[2];
              const year = match[3];
              dataActual = `${year}-${month}-${day}`;
            }

            const dataActualFormat = new Date(`${dataActual}`);

            return dataActualFormat >= dataStart && dataActualFormat <= dataEnd;
          });

          this.dataObject$.next(arrUserActualOperations);
        });

        break;
    }
  }

  fnMonth(data: string): void {
    this.arrDate = new Date().toLocaleDateString().split('.');
    if (this.name == data) {
      for (let item of this.dataUserOperations) {
        this.arrDateItem = item.data.split('.');

        if (this.arrDate[1] === this.arrDateItem[1]) {
          // месяц совпадает
          this.arrCorrectElements.push(item);
        }
      }

      this.dataObject$.next(this.arrCorrectElements);
    }
  }

  constructor(tmp: HttpClient) {
    this.#getDataServer
      .getDataUserOperationAPI()
      .pipe(
        retry({ count: 3, delay: 2000 }),
        catchError((err) => {
          return throwError(() => err());
        })
      )
      .subscribe({
        next: (data: DataUserOperation[]) => {
          this.dataUserOperations = data;
          for (let item of this.dataUserOperations) {
            let datePipe = new Date(item.data);
            const unit = this.#datePipe.transform(datePipe, 'dd.MM.yyyy');
            item.data = String(unit);
          }
          this.fnMonth('forMonth');
        },
        error: (err) => console.log('Ошибка в получении данных'),
      });
  }

  ngOnDestroy(): void {
    if (this.dateFromInput) {
      this.dateFromInput.unsubscribe();
    }
  }
}
