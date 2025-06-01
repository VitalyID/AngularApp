import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { loremIpsum } from 'lorem-ipsum';
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
  cardCount = signal(0);

  readonly #route = inject(ActivatedRoute);
  readonly #routService = inject(RoutIDservice);
  readonly #buttonService = inject(ButtonService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  cards: Signal<UserCardState> = this.#store.selectSignal(ListOfCards.getCards);

  cardCountEffect = effect(() => {
    if (this.cards()) {
      this.cardCount.set(this.cards().cards.length);
      // console.log(cardsForPagination);
    }
  });

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routService.getIDroute(this.asideID);

    // when this page is started, we send offset pagination to back
    this.#store.dispatch(new UpdateCards(0));
  }

  randomText(): string {
    const range = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    return loremIpsum({ count: range });
  }

  userPage(page: string) {
    console.log('user page: ', page);
    this.#store.dispatch(new UpdateCards((Number(page) - 1) * 12));
  }

  constructor() {}
}
