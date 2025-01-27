import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
export class MainComponent implements OnInit, OnDestroy {
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

  private btnSubscription!: Subscription;

  ngOnInit(): void {
    this.btnSubscription = this.#btnService.eventClick$.subscribe((data) => {
      if (data.id == 3) {
        console.log('Кнопка нажата с ID:', data.id);
        // пишем логику клика по кнопке
      }
    });
  }

  ngOnDestroy(): void {
    if (this.btnSubscription) {
      this.btnSubscription.unsubscribe();
    }
  }

  constructor() {}
}
