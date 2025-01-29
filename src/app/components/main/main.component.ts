import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../shared.module';
import { ChartComponent } from '../chart/chart.component';
import { TableComponent } from '../table/table.component';
import { ButtonData } from './../../types/sectionItem';
import { ButtonService } from './../buttons/service/buttons.component.service';

@Component({
  selector: 'main',
  standalone: true,
  imports: [TableComponent, SharedModule, ChartComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  readonly #btnService = inject(ButtonService);

  public btnText: ButtonData = {
    text: 'Создать QR-Code',
    iconClass: 'icon-add-outline',
    id: 3,
  };

  clickOn() {
    // отправляем в сервис клик по кнопке с ее идентификатором "3".
    this.#btnService.clickOnButton(this.btnText.id);
  }
  constructor() {
    this.#btnService.eventClick$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (data.id == 3) {
          console.log('Кнопка нажата с ID:', data.id);
          // пишем логику клика по кнопке
        }
      });
  }
}
