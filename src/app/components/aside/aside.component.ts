import { Component } from '@angular/core';
import { SectionItem } from './../../types/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'app-aside',
  standalone: false,

  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent {
  public title2: SectionItem[] = [
    {
      title: 'Главная',
      icon: '/assets/icons/symbol-defs.svg#icon-icons',
      ID: 1,
    },
    {
      title: 'Moй QR',
      icon: '/assets/icons/symbol-defs.svg#icon-Scan',
      ID: 2,
    },
    {
      title: 'Агентам',
      icon: '/assets/icons/symbol-defs.svg#icon-Work',
      ID: 3,
    },
    {
      title: 'Мои реквизиты',
      icon: '/assets/icons/symbol-defs.svg#icon-Credit-card',
      ID: 4,
    },
    {
      title: 'Персональные данные',
      icon: '/assets/icons/symbol-defs.svg#icon-Profile',
      ID: 5,
    },
    {
      title: 'Мои площадки',
      icon: '/assets/icons/symbol-defs.svg#icon-myPlace',
      ID: 6,
    },
    {
      title: 'Мои сотрудники',
      icon: '/assets/icons/symbol-defs.svg#icon-myStaff',
      ID: 7,
    },
    {
      title: 'Мои отзывы',
      icon: '/assets/icons/symbol-defs.svg#icon-myFeedbacks',
      ID: 8,
    },
    {
      title: 'Программа лояльности',
      icon: '/assets/icons/symbol-defs.svg#loyalty',
      ID: 9,
    },
    {
      title: 'Выйти',
      icon: '/assets/icons/symbol-defs.svg#logout',
      ID: 10,
    },
  ];

  activePath: string | null = null;

  public generalGroup: SectionItem[] = [];
  public myGroup: SectionItem[] = [];
  public othergroup: SectionItem[] = [];
  public logOut: SectionItem[] = [];

  public btnText : string = 'Служба поддержки'

  ngOnInit(): void {
    this.generalGroup = this.title2.slice(0, 9);
    // this.myGroup = this.title2.slice(5, 8);
    // this.othergroup = this.title2.slice(8, 9);
    this.logOut = this.title2.slice(9, 10);

    this.btnText = this.btnText;
  }

  activeItemID: number | null = null;
  selectItem(item: SectionItem) {
    this.activeItemID = item.ID;
  }



  // public isMy : string[] = ['Мои площадки', 'Мои сотрудники','Мои отзывы' ]
}
