import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutIDservice } from '../../services/transmitDataRout.service';
import { SharedModule } from '../../shared.module';
import { ButtonData } from '../../types/sectionItem';
import { QrCardComponent } from '../qr-card/qr-card.component';

@Component({
  selector: 'my-qr',
  imports: [SharedModule, QrCardComponent],
  templateUrl: './my-qr.component.html',
  styleUrl: './my-qr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyQRComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #routService = inject(RoutIDservice);

  asideID: number = 0;
  btnText: ButtonData = {
    id: 5,
    text: 'Добавить QR код',
    iconClass: 'icon-add-outline',
  };

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routService.getDataRoute(this.asideID);
  }
}
