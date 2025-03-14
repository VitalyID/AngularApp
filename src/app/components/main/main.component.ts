import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutIDservice } from '../../services/transmitDataRout.service';
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
export class MainComponent implements OnInit {
  readonly #btnService = inject(ButtonService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #route = inject(ActivatedRoute);
  readonly #routService = inject(RoutIDservice);
  readonly #router = inject(Router);

  asideID: number = 0;

  public btnText: ButtonData = {
    text: 'Создать QR-Code',
    iconClass: 'icon-add-outline',
    id: 3,
  };

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
  }

  clickOn() {
    // отправляем в сервис клик по кнопке с ее идентификатором "3".
    this.#btnService.clickOnButton(this.btnText.id);
  }
}
