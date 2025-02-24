import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TitleAside } from '../../../types/enums/titleAside';
import { SectionItem } from '../../../types/interfaces/asideSVG';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { ButtonData } from '../../../types/sectionItem';
import { ButtonService } from '../../buttons/service/buttons.component.service';
import { LinkAside } from './tupes/enum/routerLink';

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

  public listSections: SectionItem[] = [
    {
      title: TitleAside.main,
      icon: 'icon-icons',
      ID: 1,
      route: LinkAside.main,
    },
    {
      title: TitleAside.myQR,
      icon: 'icon-Scan',
      ID: 2,
      route: LinkAside.myQR,
    },
    {
      title: TitleAside.agents,
      icon: 'icon-Work',
      ID: 3,
      route: LinkAside.agents,
    },
    {
      title: TitleAside.requisites,
      icon: 'icon-Credit-card',
      ID: 4,
      route: LinkAside.requisites,
    },
    {
      title: TitleAside.personalData,
      icon: 'icon-Profile',
      ID: 5,
      route: LinkAside.personalData,
    },
    {
      title: TitleAside.myPlace,
      icon: 'icon-myPlace',
      ID: 6,
      route: LinkAside.myPlace,
    },
    {
      title: TitleAside.myStaff,
      icon: 'icon-myStaff',
      ID: 7,
      route: LinkAside.myStaff,
    },
    {
      title: TitleAside.myFeedbacks,
      icon: 'icon-myFeedbacks',
      ID: 8,
      route: LinkAside.myFeedbacks,
    },
    {
      title: TitleAside.loyalty,
      icon: 'icon-loyalty',
      ID: 9,
      route: LinkAside.loyalty,
    },
    {
      title: TitleAside.logOut,
      icon: 'icon-Logout',
      ID: 10,
      route: LinkAside.logOut,
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

    this.generalGroup = this.listSections.slice(0, 9);
    this.logOut = this.listSections.slice(9, 10);

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
