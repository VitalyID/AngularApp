import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { loremIpsum } from 'lorem-ipsum';
import { Observable } from 'rxjs';
// import { GetDataQrService } from '../../services/get-data-qr.service';
import { RoutIDservice } from '../../services/transmitDataRout.service';
import { ButtonService } from '../../shared/components/buttons/service/buttons.component.service';

import UpdateCards from '../../state/cards.action';
import { ListOfCards, UserCard, UserCardState } from '../../state/cards.state';
import { ButtonData } from '../../types/sectionItem';

@Component({
  standalone: false,
  selector: 'my-qr',
  // imports: [QrCardComponent, ButtonsComponent, CommonModule, RouterLink],

  templateUrl: './my-qr.component.html',
  styleUrl: './my-qr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyQRComponent implements OnInit {
  asideID: number = 0;
  btnText: ButtonData = {
    id: 5,
    text: 'Добавить QR код',
    iconClass: 'icon-add-outline',
  };

  gridRows: string = '';
  sumCard: number = 0;
  src: string = '';
  getCards: UserCard[] = [];

  readonly #route = inject(ActivatedRoute);
  readonly #routService = inject(RoutIDservice);
  readonly #buttonService = inject(ButtonService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #store = inject(Store);
  // readonly #http = inject(GetDataQrService);

  cards$: Observable<UserCardState> = this.#store.select(ListOfCards.getCards);

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

    // console.log('Запрашиваем сервер');
    this.#store.dispatch(new UpdateCards());
    // console.log('сервер запрошен');
  }

  randomText(): string {
    const range = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    return loremIpsum({ count: range });
  }

  constructor() {}
}
