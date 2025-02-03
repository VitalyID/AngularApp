import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ButtonService } from '../components/buttons/service/buttons.component.service';
import {
  DataUserOperation,
  DateTimeUserOperations,
} from './../types/sectionItem';

@Injectable({
  providedIn: 'root',
})
export class TransmitDataService implements OnDestroy {
  readonly #service = inject(ButtonService);

  public dataUserOperations: DataUserOperation[] = [
    {
      data: '03.02.2025',
      country: 'Russia',
      tips: '500 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '02.02.2025',
      country: 'Russia',
      tips: '5250 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '01.02.2025',
      country: 'Russia',
      tips: '8100 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '31.01.2025',
      country: 'Russia',
      tips: '800 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '30.01.2025',
      country: 'Russia',
      tips: '1250 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '27.01.2025',
      country: 'Russia',
      tips: '4800 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '26.01.2025',
      country: 'Russia',
      tips: '9800 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '25.01.2025',
      country: 'Russia',
      tips: '900 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '24.01.2025',
      country: 'Russia',
      tips: '1300 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '23.01.2025',
      country: 'Russia',
      tips: '0300 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },

    {
      data: '22.01.2025',
      country: 'Russia',
      tips: '5900 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '21.01.2025',
      country: 'Russia',
      tips: '6100 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '20.01.2025',
      country: 'Russia',
      tips: '1490 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '16.01.2025',
      country: 'Russia',
      tips: '1000 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '15.01.2025',
      country: 'Russia',
      tips: '1500 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '14.01.2025',
      country: 'Russia',
      tips: '5000 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '01.01.2025',
      country: 'Russia',
      tips: '1300 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '28.12.2024',
      country: 'Russia',
      tips: '9800 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '18.12.2024',
      country: 'Russia',
      tips: '1800 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '17.12.2024',
      country: 'Russia',
      tips: '800 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '16.12.2024',
      country: 'Russia',
      tips: '6000 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '15.12.2024',
      country: 'Russia',
      tips: '10000 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '14.11.2024',
      country: 'Russia',
      tips: '5900 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '13.11.2024',
      country: 'Russia',
      tips: '7800 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '10.11.2024',
      country: 'Russia',
      tips: '2300 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '16.10.2024',
      country: 'Russia',
      tips: '5500 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '16.09.2024',
      country: 'Russia',
      tips: '1100 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '15.09.2024',
      country: 'Russia',
      tips: '1950 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '10.09.2024',
      country: 'Russia',
      tips: '3400 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '09.08.2024',
      country: 'Russia',
      tips: '9000 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '08.08.2024',
      country: 'Russia',
      tips: '6000 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
  ];

  private id: number = 3;
  private now = new Date();
  arrDate: string[] = [];
  arrDateItem: string[] = [];
  private arrCorrectElements: DataUserOperation[] = [];
  public dataObject$ = new BehaviorSubject<DataUserOperation[]>([]);

  #tmp?: DateTimeUserOperations;
  private dateFromInput!: Subscription;

  getDataUserTab(id: number) {
    this.id = id;

    let arrUserActualOperations;

    if (this.id == 0) {
      console.log(id);
      this.arrCorrectElements = [];
      for (let item of this.dataUserOperations) {
        this.arrDateItem = item.data.split('.');

        if (this.arrDate[0] === this.arrDateItem[0]) {
          this.arrCorrectElements.push(item);
        } else {
        }
      }
      console.log('ready to transmit ', this.arrCorrectElements);
      this.dataObject$.next(this.arrCorrectElements);
    } else if (this.id == 1) {
      console.log(id);
      this.arrCorrectElements = [];

      for (let item of this.dataUserOperations) {
        this.arrDateItem = item.data.split('.');
        if (Number(this.arrDate[0]) - 1 === Number(this.arrDateItem[0])) {
          this.arrCorrectElements.push(item);
        } else {
        }
      }

      this.dataObject$.next(this.arrCorrectElements);
    } else if (this.id == 2) {
      console.log(id);
      this.arrCorrectElements = [];
      let currentDay: number = this.now.getDay() - 1;

      const arrUserOperationForWeek = this.dataUserOperations.filter((item) => {
        return (
          Number(item.data.split('.')[0]) <= Number(this.arrDate[0]) &&
          Number(item.data.split('.')[0]) >=
            Number(this.arrDate[0]) - currentDay
        );
      });
      this.arrCorrectElements = arrUserOperationForWeek;
      this.dataObject$.next(this.arrCorrectElements);
    } else if (this.id == 3) {
      console.log(id);
      this.arrCorrectElements = [];
      const arrOperationsForMonth = this.dataUserOperations.filter((item) => {
        return Number(item.data.split('.')[1]) === Number(this.arrDate[1]);
      });
      this.arrCorrectElements = arrOperationsForMonth;
      this.dataObject$.next(this.arrCorrectElements);
    } else if (this.id == 4) {
      console.log(id);
      this.arrCorrectElements = [];
      this.now.setMonth(-1);

      const arrOperationsForLastMonth = this.dataUserOperations.filter(
        (item) => {
          return Number(item.data.split('.')[1]) === this.now.getMonth() + 1;
        }
      );

      this.arrCorrectElements = arrOperationsForLastMonth;
      this.dataObject$.next(this.arrCorrectElements);
    } else if (this.id == 5) {
      console.log(id);
      this.dateFromInput = this.#service.DateFromInput$.subscribe((data) => {
        this.#tmp = data.obj as DateTimeUserOperations;

        let dataStart = new Date(this.#tmp.dateFrom);
        let dataEnd = new Date(this.#tmp.dateEnd);
        console.log(this.#tmp.dateFrom, this.#tmp.dateEnd);
        console.log(dataEnd, dataStart);

        arrUserActualOperations = this.dataUserOperations.filter((item) => {
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

        this.dataObject$.next(this.arrCorrectElements);
      });
    }
  }

  constructor() {
    this.arrDate = this.now.toLocaleDateString().split('.');

    // Интервал по умолчанию - месяц
    if (this.id == 3) {
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

  ngOnDestroy(): void {
    if (this.dateFromInput) {
      this.dateFromInput.unsubscribe();
    }
  }
}
