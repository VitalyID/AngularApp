// import { Cards } from './cards.state';
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';
import { GetDataQrService } from '../services/get-data-qr.service';
import { PostCardService } from '../services/post-data-qr.service';
import UpdateCards, { PostCard, UpdateEditCard } from './cards.action';

export interface Cards {
  cards: UserCard[];
  // editCard need for changing property and reactive displaying in preview component
  editCard: UserCard;
  error: string | null;
}

export interface UserCard {
  background_hex_color: string;
  business_payment_type: string;
  button_hex_color: string;
  commission_coverage: boolean;
  employee_display: boolean;
  id: number;
  logo_file_id: number | null | string;
  platform_id: string;
  preset_payment_sizes: number[];
  qr_image: string;
  rating: boolean;
  reviews: boolean;
  smiles: boolean;
}

const defaultValue: Cards = {
  cards: [],
  editCard: {
    background_hex_color: '#e7e9fo',
    business_payment_type: 'TIPS',
    button_hex_color: '#3FA949',
    commission_coverage: false,
    employee_display: true,
    id: 0,
    logo_file_id: '../../assets/images/logoDefault.png',
    platform_id: '514159',
    preset_payment_sizes: [100, 250, 500],
    qr_image: '',
    rating: false,
    reviews: false,
    smiles: false,
  },
  error: null,
};

@State<Cards>({
  name: 'cards',
  defaults: defaultValue,
})
@Injectable()
export class ListOfCards {
  readonly #httpGet = inject(GetDataQrService);
  readonly #httpPost = inject(PostCardService);
  readonly #store = inject(Store);

  // cards$: Observable<Cards> = this.#store.select(ListOfCards.getCards);

  @Selector()
  static getCards(state: Cards) {
    return state;
  }

  @Selector()
  static getEditCard(state: Cards) {
    return state.editCard;
  }

  @Action(UpdateEditCard)
  updateEditCard(ctx: StateContext<Cards>, { newCard }: UpdateEditCard) {
    ctx.patchState({ editCard: newCard });
  }

  @Action(UpdateCards)
  updateCards(ctx: StateContext<Cards>) {
    const state = ctx.getState();

    return this.#httpGet.getQR().pipe(
      tap((data) => {
        ctx.patchState({
          cards: data,
        });
      }),
      catchError((error) => {
        console.error('Ошибка: ', error);
        ctx.patchState({
          error: error.message,
        });
        return of(null);
      })
      // take(1)
    );
  }

  @Action(PostCard)
  postCard(ctx: StateContext<Cards>, { newCard }: PostCard) {
    console.log('callback action');

    return this.#httpPost.post(newCard);
  }
}
