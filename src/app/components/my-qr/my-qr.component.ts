import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { loremIpsum } from 'lorem-ipsum';
import { RoutIDservice } from '../../services/transmitDataRout.service';
import { SharedModule } from '../../shared.module';
import { ButtonData } from '../../types/sectionItem';
import { ButtonService } from '../buttons/service/buttons.component.service';
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
  readonly #buttonService = inject(ButtonService);
  readonly #destroyRef = inject(DestroyRef);

  asideID: number = 0;
  btnText: ButtonData = {
    id: 5,
    text: 'Добавить QR код',
    iconClass: 'icon-add-outline',
  };

  gridRows: string = '';
  sumCard: number = 0;
  src: string = '';

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routService.getIDroute(this.asideID);

    this.#buttonService.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data.id === 5) {
          const lorem = this.randomText();

          const baseUrl = 'http://api.qrserver.com/v1/create-qr-code/?data=';
          const size = '&size=150x150';
          this.src = `${baseUrl}${lorem}${size}`;
        }
      });
  }

  randomText(): string {
    const range = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    return loremIpsum({ count: range });
  }

  constructor() {}
}
