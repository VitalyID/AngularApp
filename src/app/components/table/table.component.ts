import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonData, DataUserOperation } from '../../types/sectionItem';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'table',
  imports: [SharedModule,CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  public tab : string[] = ['За сегодня','За вчера','За неделю','За месяц','За прошлый месяц','За период'];

public btnText: ButtonData = {text: 'Скачать в Exel', iconClass : 'icon-PaperDownload'}

public dataUserOperations : DataUserOperation[] =[
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '15.01.2025',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '14.01.2025',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '01.01.2025',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.12.2024',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.12.2024',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.11.2024',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.11.2024',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.11.2024',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.01.2025',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  },
  {
    'data': '16.10.2025',
    'country' : 'Russia',
    'tips': '100 ₽  ',
    'commission': '12 ₽',
    'email': 'mail@mail.ru',
    'card': '4563****2569'
  }
]
}
