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
      data: '10.02.2025',
      country: 'Turkey',
      tips: '6190 ₽  ',
      commission: '7.26 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '09.02.2025',
      country: 'Ukraine',
      tips: '1190 ₽  ',
      commission: '3.6 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '08.02.2025',
      country: 'Ukraine',
      tips: '100 ₽  ',
      commission: '1 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '07.02.2025',
      country: 'Ukraine',
      tips: '8700 ₽  ',
      commission: '13 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '06.02.2025',
      country: 'Italy',
      tips: '2950 ₽  ',
      commission: '4 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '05.02.2025',
      country: 'Germany',
      tips: '4500 ₽  ',
      commission: '6.5 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '04.02.2025',
      country: 'English',
      tips: '5005 ₽  ',
      commission: '7 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '03.02.2025',
      country: 'Russia',
      tips: '500 ₽  ',
      commission: '1.3 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '02.02.2025',
      country: 'Russia',
      tips: '5250 ₽  ',
      commission: '6.25 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '01.02.2025',
      country: 'Russia',
      tips: '8100 ₽  ',
      commission: '9 ₽',
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

  private name: string = 'forMonth';
  arrDate: string[] = [];
  arrDateItem: string[] = [];
  private arrCorrectElements: DataUserOperation[] = [];
  public dataObject$ = new BehaviorSubject<DataUserOperation[]>([]);

  #tmp?: DateTimeUserOperations;
  private dateFromInput!: Subscription;

  getDataUserTab(name: string) {
    this.name = name;

    let arrUserActualOperations;

    switch (this.name) {
      case 'today':
        this.arrCorrectElements = [];
        // console.log(this.arrDate);

        for (let item of this.dataUserOperations) {
          this.arrDateItem = item.data.split('.');

          if (
            this.arrDate[0] === this.arrDateItem[0] &&
            this.arrDate[1] === this.arrDateItem[1] &&
            this.arrDate[2] === this.arrDateItem[2]
          ) {
            this.arrCorrectElements.push(item);
          } else {
          }
        }

        this.dataObject$.next(this.arrCorrectElements);

        break;
      case 'yestarday':
        this.arrCorrectElements = [];

        for (let item of this.dataUserOperations) {
          // this.arrDateItem = item.data.split('.').reverse().join('-');
          const dataFromServerString = item.data.split('.').reverse().join('-');
          const dataFromServerObj = new Date(dataFromServerString);

          const today = new Date();
          const setYesterday = new Date(today.setDate(today.getDate() - 1));
          // console.log(today.toLocaleString().split(',')[0]);

          if (
            setYesterday.toLocaleString().split(',')[0] ===
            dataFromServerObj.toLocaleString().split(',')[0]
          ) {
            // console.log(item.data);
            this.arrCorrectElements.push(item);
            // console.log(this.arrCorrectElements);
          }
        }
        this.dataObject$.next(this.arrCorrectElements);
        break;
      case 'forWeek':
        let dayWeek: number = new Date().getDay();

        if (dayWeek === 0) {
          dayWeek = 7;
        } else {
          dayWeek -= 1;
        }

        // startDay
        const dayZero = new Date();
        const startDay = new Date(
          dayZero.getTime() - dayWeek * 24 * 60 * 60 * 1000
        )
          .toLocaleString()
          .split(',')[0]
          .split('.');

        // EndDay
        const currentDay = new Date().toLocaleString().split(',')[0].split('.');

        const arrUserOperationsForWeek: DataUserOperation[] = [];

        for (let item of this.dataUserOperations) {
          const arrData = item.data.split('.');

          if (
            arrData[2] >= startDay[2] &&
            arrData[2] <= startDay[2] &&
            arrData[1] >= startDay[1] &&
            arrData[1] <= startDay[1] &&
            arrData[0] >= startDay[0] &&
            arrData[0] <= startDay[0]
          ) {
            arrUserOperationsForWeek.push(item);
          }
        }

        this.dataObject$.next(arrUserOperationsForWeek);
        break;
      case 'forMonth':
        // this.arrCorrectElements = [];
        const arrOperationsForMonth = this.dataUserOperations.filter((item) => {
          return Number(item.data.split('.')[1]) === Number(this.arrDate[1]);
        });
        // this.arrCorrectElements = arrOperationsForMonth;
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

  constructor() {
    this.arrDate = new Date().toLocaleDateString().split('.');

    // Интервал по умолчанию - месяц
    if (this.name == 'forMonth') {
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
