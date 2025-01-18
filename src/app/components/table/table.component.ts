import { ChangeDetectionStrategy, Component , OnInit} from '@angular/core';
import { ButtonClass, ButtonData, DataUserOperation } from '../../types/sectionItem';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
// import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'table',
  imports: [SharedModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit{
  public tab : string[] = ['За сегодня','За вчера','За неделю','За месяц','За прошлый месяц','За период'];

public btnText: ButtonData = {text: 'Скачать в Exel', iconClass : 'icon-PaperDownload'};
public classFromTableComponent: ButtonClass= {background : '#F7F9FB', color: '#101112'}

public dataUserOperations : DataUserOperation[] =[
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '1000 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '15.01.2025',
    'country' : 'Russia',
    'tips': '1500 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '14.01.2025',
    'country' : 'Russia',
    'tips': '5000 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '01.01.2025',
    'country' : 'Russia',
    'tips': '1300 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.12.2024',
    'country' : 'Russia',
    'tips': '800 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.12.2024',
    'country' : 'Russia',
    'tips': '10000 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.11.2024',
    'country' : 'Russia',
    'tips': '5900 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.11.2024',
    'country' : 'Russia',
    'tips': '7800 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.11.2024',
    'country' : 'Russia',
    'tips': '2300 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '5500 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '1100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '1950 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '1800 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.10.2025',
    'country' : 'Russia',
    'tips': '6000 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  }
]

// public dataX : string[] = []
// public dataY :  number[] = []

constructor () {
  console.log (typeof this.dataUserOperations)
}

private dataX: string[] = [];
private dataY : string[] = [];

ngOnInit(): void {

for ( let item of this.dataUserOperations) {
  // console.log (item.data);
  this.dataX.push (item.data);
  this.dataY.push (item.tips)
  }

  console.log (this.dataX);
  console.log (this.dataY);



}


}

