import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
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
  readonly #route = inject(ActivatedRoute);

  asideID?: number;

  public title2: SectionItem[] = [
    {
      title: 'Главная',
      icon: 'icon-icons',
      ID: 1,
    },
    {
      title: 'Moй QR',
      icon: 'icon-Scan',
      ID: 2,
    },
    {
      title: 'Агентам',
      icon: 'icon-Work',
      ID: 3,
    },
    {
      title: 'Мои реквизиты',
      icon: 'icon-Credit-card',
      ID: 4,
    },
    {
      title: 'Персональные данные',
      icon: 'icon-Profile',
      ID: 5,
    },
    {
      title: 'Мои площадки',
      icon: 'icon-myPlace',
      ID: 6,
    },
    {
      title: 'Мои сотрудники',
      icon: 'icon-myStaff',
      ID: 7,
    },
    {
      title: 'Мои отзывы',
      icon: 'icon-myFeedbacks',
      ID: 8,
    },
    {
      title: 'Программа лояльности',
      icon: 'icon-loyalty',
      ID: 9,
    },
    {
      title: 'Выйти',
      icon: 'icon-Logout',
      ID: 10,
    },
  ];

  public generalGroup: SectionItem[] = [];
  public myGroup: SectionItem[] = [];
  public otherGroup: SectionItem[] = [];
  public logOut: SectionItem[] = [];

  public btnText: ButtonData = {
    text: 'Служба поддержки',
    id: 4,
  };

  logoSetting: SvgSpriteSetting = {
    iconID: 'icon-logo',
    width: '98px',
    height: '31px',
    fill: 'black',
  };

  activePath: string | null = null;
  activeItemID: number | null = null;

  ngOnInit(): void {
    // link section with activeRout
    this.asideID = this.#route.snapshot.data['asideID'];

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
    return this.activeMenuItem.indexOf(id) != -1;
  }
}
