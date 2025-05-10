import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { v4 as uuidv4 } from 'uuid';
import { ButtonService } from '../../shared/components/buttons/service/buttons.component.service';
import { ListDropdown } from '../../shared/components/dropdown/types/interface/listDropdown';

// import { CommonModule } from '@angular/common';
// import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
// import { ChartComponent } from '../../shared/components/chart/chart.component';
// import { TableComponent } from '../../shared/components/table/table.component';
import { ButtonData } from './../../types/sectionItem';

@Component({
  selector: 'main',
  standalone: false,
  // imports: [TableComponent, ChartComponent, ButtonsComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  readonly #btnService = inject(ButtonService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);
  readonly #store = inject(Store);

  // asideID: number = 0;
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

  ngOnInit(): void {
    // console.log('Запрашиваем сервер');
    // this.#store.dispatch(new UpdateCards());
    // console.log('сервер запрошен');
    this.#btnService.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data.id == 3) {
          // console.log('Кнопка нажата с ID:', data.id);
          // this.#store.dispatch(new UpdateCards());
          this.#router.navigate(['/create-qrcode']);
        }
      });
  }
}
