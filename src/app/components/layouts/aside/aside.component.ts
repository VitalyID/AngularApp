import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SvgSpriteSetting } from './../../../types/interfaces/svgIcon';
// import { Subscription } from 'rxjs';
import { TitleAside } from '../../../types/enums/titleAside';
import { SectionItem } from '../../../types/interfaces/asideSVG';
// import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { Observable } from 'rxjs';
import { RoutIDservice } from '../../../services/transmitDataRout.service';
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
  readonly #getRoutFromService = inject(RoutIDservice);
  routeID$: Observable<number> = this.#getRoutFromService.SendRouteService$;

  public listSections: SectionItem[] = [
    {
      title: TitleAside.main,
      iconSetting: { iconID: 'icon-icons', width: '21px', height: '21px' },
      ID: 1,
      route: LinkAside.main,
    },
    {
      title: TitleAside.myQR,
      iconSetting: { iconID: 'icon-Scan', width: '21px', height: '21px' },

      ID: 2,
      route: LinkAside.myQR,
    },
    {
      title: TitleAside.agents,
      iconSetting: { iconID: 'icon-Work', width: '21px', height: '21px' },
      ID: 3,
      route: LinkAside.agents,
    },
    {
      title: TitleAside.requisites,
      iconSetting: {
        iconID: 'icon-Credit-card',
        width: '21px',
        height: '21px',
      },
      ID: 4,
      route: LinkAside.requisites,
    },
    {
      title: TitleAside.personalData,
      iconSetting: { iconID: 'icon-Profile', width: '21px', height: '21px' },
      ID: 5,
      route: LinkAside.personalData,
    },
    {
      title: TitleAside.myPlace,
      iconSetting: { iconID: 'icon-myPlace', width: '21px', height: '21px' },
      ID: 6,
      route: LinkAside.myPlace,
    },
    {
      title: TitleAside.myStaff,
      iconSetting: { iconID: 'icon-myStaff', width: '21px', height: '21px' },
      ID: 7,
      route: LinkAside.myStaff,
    },
    {
      title: TitleAside.myFeedbacks,
      iconSetting: {
        iconID: 'icon-myFeedbacks',
        width: '21px',
        height: '21px',
      },
      ID: 8,
      route: LinkAside.myFeedbacks,
    },
    {
      title: TitleAside.loyalty,
      iconSetting: { iconID: 'icon-loyalty', width: '21px', height: '21px' },
      ID: 9,
      route: LinkAside.loyalty,
    },
    {
      title: TitleAside.logOut,
      iconSetting: { iconID: 'icon-Logout', width: '21px', height: '21px' },
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

  // добавляем класс только к элементам с этими id
  getClassForSectionItem(id: number): boolean {
    return this.activeMenuItem.indexOf(id) != -1;
  }
}
