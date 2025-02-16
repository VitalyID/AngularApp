import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { Subscription } from 'rxjs';
import { ButtonData, SectionItem } from '../../../types/sectionItem';
import { ButtonService } from '../../buttons/service/buttons.component.service';

@Component({
  selector: 'app-aside',
  standalone: false,

  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent implements OnInit {
  readonly #btnService = inject(ButtonService);
  readonly #destroyRef = inject(DestroyRef);
  readonly activeMenuItem: number[] = [6, 7, 8];

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
  // #btnSubscription!: Subscription;

  public btnText: ButtonData = {
    text: 'Служба поддержки',
    id: 4,
  };

  activeItemID: number | null = null;

  ngOnInit(): void {
    this.generalGroup = this.title2.slice(0, 9);
    this.logOut = this.title2.slice(9, 10);

    this.#btnService.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data.id == 4) {
          console.log('Кнопка нажата с ID:', data.id);
          // пишем логику клика по кнопке
        }
      });
  }

  selectItem(item: SectionItem) {
    this.activeItemID = item.ID;
  }

  // добавляем класс только к элементам с этими id

  getClassForSectionItem(id: number): boolean {
    if (this.activeMenuItem.indexOf(id) != -1) {
      return true;
    } else return false;
  }
}
