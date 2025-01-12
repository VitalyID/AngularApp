import { Component } from '@angular/core';
import { SectionItem } from '../../types/sectionItem';

@Component({
  selector: 'app-aside',
  standalone: false,

  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent {
  public title2: SectionItem[] = [
    { title: 'Главная', icon: '/assets/icons/symbol-defs.svg#icon-icons' },
    { title: 'Moй QR', icon: '/assets/icons/symbol-defs.svg#icon-Scan' },
    { title: 'Агентам', icon: '/assets/icons/symbol-defs.svg#icon-Work' },
    {
      title: 'Мои реквизиты',
      icon: '/assets/icons/symbol-defs.svg#icon-Credit-card',
    },
    {
      title: 'Персональные данные',
      icon: '/assets/icons/symbol-defs.svg#icon-Profile',
    },
    {
      title: 'Мои площадки',
      icon: '/assets/icons/symbol-defs.svg#icon-myPlace',
    },
    {
      title: 'Мои сотрудники',
      icon: '/assets/icons/symbol-defs.svg#icon-myStaff',
    },
    {
      title: 'Мои отзывы',
      icon: '/assets/icons/symbol-defs.svg#icon-myFeedbacks',
    },
    {
      title: 'Программа лояльности',
      icon: '/assets/icons/symbol-defs.svg#loyalty',
    },
    {
      title: 'Выйти',
      icon: '/assets/icons/symbol-defs.svg#logout',
    },
  ];

  public generalGroup: SectionItem[] = [];
  public myGroup: SectionItem[] = [];
  public othergroup: SectionItem[] = [];
  public logOut: SectionItem[] = [];

  ngOnInit(): void {
    this.generalGroup = this.title2.slice(0, 5);
    this.myGroup = this.title2.slice(5, 8);
    this.othergroup = this.title2.slice(8, 9);
    this.logOut = this.title2.slice(9, 10);
  }
}
