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
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { ButtonService } from '../../shared/components/buttons/service/buttons.component.service';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { ButtonData } from './../../types/sectionItem';

@Component({
  selector: 'main',
  standalone: true,
  imports: [TableComponent, ChartComponent, ButtonsComponent],
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
