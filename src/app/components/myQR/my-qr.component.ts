import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { loremIpsum } from 'lorem-ipsum';
// import { GetDataQrService } from '../../services/get-data-qr.service';
import { RoutIDservice } from '../../services/transmitDataRout.service';

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
  page: string = '1';

  readonly #routService = inject(RoutIDservice);
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  cards: Signal<UserCardState> = this.#store.selectSignal(ListOfCards.getCards);

  cardCountEffect = effect(() => {
    if (this.cards()) {
      this.cardCount.set(this.cards().pagination.total);
    }
  });

  ngOnInit(): void {
    // this.#routService.getIDroute(this.asideID);

    // when this page is started, we send offset pagination to back
    let pageId = this.#router.url.split('=')[1];
    // console.log(pageId);
    if (!pageId) {
      pageId = '1';
    }
    // console.log((Number(pageId) - 1) * 12);

    this.#store.dispatch(new UpdateCards((Number(pageId) - 1) * 12));
  }

  randomText(): string {
    const range = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    return loremIpsum({ count: range });
  }

  userPage(page: string) {
    this.page = page;
    this.#store.dispatch(new UpdateCards((Number(this.page) - 1) * 12));
    this.#router.navigate(['my-qr'], {
      queryParams: { page: this.page },
    });
  }

  constructor() {}
}
