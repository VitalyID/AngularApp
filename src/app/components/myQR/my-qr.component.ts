import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  signal,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import UpdateCards from '../../state/cards.action';
import { ListOfCards, UserCard, UserCardState } from '../../state/cards.state';
import { ButtonConfig } from '../../types/sectionItem';

@Component({
  standalone: false,
  selector: 'my-qr',
  templateUrl: './my-qr.component.html',
  styleUrl: './my-qr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyQRComponent implements OnInit {
  btnSetUp: ButtonConfig = {
    text: 'Добавить QR код',
    iconClass: 'icon-add-outline',
  };

  gridRows: string = '';
  sumCard: number = 0;
  src: string = '';
  getCards: UserCard[] = [];
  cardCount = signal(0);
  pageOffset: number = 1;
  currentPage = signal<string>('1');

  // readonly #routService = inject(RoutIDservice);
  readonly #store = inject(Store);
  readonly #router = inject(Router);
  readonly #inject = inject(Injector);

  cards: Signal<UserCardState> = this.#store.selectSignal(ListOfCards.getCards);

  ngOnInit(): void {
    runInInjectionContext(this.#inject, () => {
      effect(() => {
        if (this.cards()) {
          this.cardCount.set(this.cards().pagination.total);
        }
      });
    });

    // when this page is started or reloaded, we send offset pagination to back
    let pageId = Math.max(+(this.#router.url.split('=')[1] ?? '1'), 1);
    this.#store.dispatch(new UpdateCards(pageId - 1));

    this.setActivePaginationPage(pageId);
  }

  selectPage(offset: string) {
    // we get offset page from pagination and send it backand
    this.pageOffset = (Number(offset) - 1) * 12;

    this.#store.dispatch(new UpdateCards(this.pageOffset));
    this.#router.navigate(['my-qr'], {
      queryParams: { offset: this.pageOffset + 1 },
    });

    this.setActivePaginationPage(this.pageOffset);
  }

  navigateCreateQrPage() {
    this.#router.navigate(['create-qrcode']);
  }

  setActivePaginationPage(pageId: number): void {
    this.currentPage.set((pageId / 12 + 1).toString());
    // this check for reload pages
    if (pageId % 2 !== 0) {
      this.currentPage.set(Math.ceil(pageId / 12).toString());
    }
  }

  constructor() {}
}
