import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { StateMenuService } from '../../services/state-menu';
import { RoutIDservice } from '../../services/transmitDataRout.service';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { ButtonService } from '../../shared/components/buttons/service/buttons.component.service';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { ListDropdown } from '../../shared/components/dropdown/types/interface/listDropdown';
import { TableComponent } from '../../shared/components/table/table.component';
import { AsideComponent } from '../layouts/aside/aside.component';
import { ClickOutsideDirective } from '../layouts/aside/directives/click-outside.directive';
import { EscCloseDirective } from '../layouts/aside/directives/esc-close.directive';
import { ButtonData } from './../../types/sectionItem';

@Component({
  selector: 'main',
  standalone: true,
  imports: [
    TableComponent,
    ChartComponent,
    ButtonsComponent,
    DropdownComponent,
    AsideComponent,
    CommonModule,
    EscCloseDirective,
    ClickOutsideDirective,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  readonly #btnService = inject(ButtonService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #route = inject(ActivatedRoute);
  readonly #routService = inject(RoutIDservice);
  readonly #router = inject(Router);

  asideID: number = 0;
  parent: string = 'main';

  public btnText: ButtonData = {
    text: 'Создать QR-Code',
    iconClass: 'icon-add-outline',
    id: 3,
  };

  list: ListDropdown[] = [
    {
      id: uuidv4(),
      item: 'list1',
      icon: { iconID: 'star', width: '10px', height: '10px' },
    },
    {
      id: uuidv4(),
      item: 'list2',
      icon: { iconID: 'icon-share', width: '10px', height: '10px' },
    },
    {
      id: uuidv4(),
      item: 'list3',
      icon: { iconID: 'icon-loyalty', width: '10px', height: '10px' },
    },
  ];

  readonly #menuService = inject(StateMenuService);
  readonly #cdr = inject(ChangeDetectorRef);

  menuState: boolean = false;
  isShadow: boolean = false;

  // isOpen transmitted to Drectives for checking state component aside.
  // Component Aside is open after 1s, because its time need for animations
  isOpen: boolean = false;

  //  menuState$:Observable<boolean> = this.#menuService.stateMenuService.getValue();

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];
    // send routID to service
    this.#routService.getIDroute(this.asideID);

    this.#btnService.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data.id == 3) {
          console.log('Кнопка нажата с ID:', data.id);
          this.#router.navigate(['/create-qrcode']);
        }
      });

    this.#menuService.stateMenuService
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.menuState = data;
        this.isShadow = data;

        if (data) {
          setTimeout(() => {
            this.isOpen = true;
            this.#cdr.detectChanges();
          }, 1000);
        }
      });
  }

  clickOn() {
    // отправляем в сервис клик по кнопке с ее идентификатором "3".
    this.#btnService.clickOnButton(this.btnText.id);
  }

  onMenuClosed(data: boolean) {
    if (data) {
      this.menuState = false;
      this.isShadow = false;
      this.isOpen = false;
      this.#cdr.detectChanges();
    }
  }

  onMenuClosedByClick(data: boolean) {
    if (this.menuState) {
      this.menuState = false;
      this.isShadow = false;
      this.isOpen = false;
    }
  }
}
