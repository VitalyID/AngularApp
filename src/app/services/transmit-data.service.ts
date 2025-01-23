import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataUserOperation } from './../types/sectionItem';

@Injectable({
  providedIn: 'root',
})
export class TransmitDataService {
  public dataUserOperations: DataUserOperation[] = [
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
      tips: '5300 ₽  ',
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
      tips: '6000 ₽  ',
      commission: '12 ₽',
      email: 'mail@mail.ru',
      card: '4563****2569',
    },
    {
      data: '09.08.2024',
      country: 'Russia',
      tips: '6000 ₽  ',
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

  private index: number = 3;
  private now = new Date();
  arrDate: string[] = [];
  arrDateItem: string[] = [];
  private arrCorrectElements: DataUserOperation[] = [];
  private _correctData: BehaviorSubject<DataUserOperation[]> =
    new BehaviorSubject<DataUserOperation[]>([]);
  public dataObject$: Observable<DataUserOperation[]> =
    this._correctData.asObservable();

  getDataUserTab(index: number) {
    this.index = index;

    if (this.index == 0) {
      this.arrCorrectElements = [];
      for (let item of this.dataUserOperations) {
        this.arrDateItem = item.data.split('.');

        if (this.arrDate[0] === this.arrDateItem[0]) {
          this.arrCorrectElements.push(item);
        } else {
        }
      }
      console.log('ready to transmit ', this.arrCorrectElements);
      this._correctData.next(this.arrCorrectElements);
    } else if (this.index === 1) {
      this.arrCorrectElements = [];
      for (let item of this.dataUserOperations) {
        this.arrDateItem = item.data.split('.');

        if (Number(this.arrDate[0]) - 1 === Number(this.arrDateItem[0])) {
          this.arrCorrectElements.push(item);
        }
      }

      console.log('ready to transmit ', this.arrCorrectElements);
      this._correctData.next(this.arrCorrectElements);
      // ---------------------------------------------------------------------
    } else if (this.index === 2) {
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
      this._correctData.next(this.arrCorrectElements);
    } else if (this.index === 3) {
      this.arrCorrectElements = [];
      const arrOperationsForMonth = this.dataUserOperations.filter((item) => {
        return Number(item.data.split('.')[1]) === Number(this.arrDate[1]);
      });
      this.arrCorrectElements = arrOperationsForMonth;
      this._correctData.next(this.arrCorrectElements);
    } else if (this.index === 4) {
      this.arrCorrectElements = [];
      this.now.setMonth(-1);

      const arrOperationsForLastMonth = this.dataUserOperations.filter(
        (item) => {
          return Number(item.data.split('.')[1]) === this.now.getMonth() + 1;
        }
      );

      this.arrCorrectElements = arrOperationsForLastMonth;
      this._correctData.next(this.arrCorrectElements);
    }
    // else if (this.index === 5) {
    //   btnText: ButtonData = {
    //     text: 'Ok',
    //     disabled: false,
    //   };
    // }
  }

  constructor() {
    this.arrDate = this.now.toLocaleDateString().split('.');

    // Интервал - месяц
    if (this.index == 3) {
      for (let item of this.dataUserOperations) {
        this.arrDateItem = item.data.split('.');

        if (this.arrDate[1] === this.arrDateItem[1]) {
          // месяц совпадает
          this.arrCorrectElements.push(item);
        }
      }
      this._correctData.next(this.arrCorrectElements);
    }
  }
}
