// import { Cards } from './cards.state';
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { GetDataQrService } from '../services/get-data-qr.service';
import UpdateCards from './cards.action';

export interface Cards {
  cards: UserCard[];
  activeCard: UserCard;
  error: {} | null;
}

export interface UserCard {
  background_hex_color: string;
  business_payment_type: string;
  button_hex_color: string;
  commission_coverage: boolean;
  employee_display: boolean;
  id: number;
  logo_file_id: string | null;
  platform_id: string;
  preset_payment_sizes: [];
  qr_image: string;
  rating: boolean;
  reviews: boolean;
  smiles: boolean;
}

const defaultValue: Cards = {
  cards: [],
  activeCard: {
    background_hex_color: '#eeeff2',
    business_payment_type: '',
    button_hex_color: '#eeeff2',
    commission_coverage: false,
    employee_display: false,
    id: 1,
    logo_file_id: null,
    platform_id: '',
    preset_payment_sizes: [],
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
  readonly #http = inject(GetDataQrService);
  readonly #store = inject(Store);
  // readonly #destroyRef = inject(DestroyRef);

  cards$: Observable<Cards> = this.#store.select(ListOfCards.getCards);
  @Selector()
  static getCards(state: Cards) {
    return state;
  }

  @Action(UpdateCards)
  updateCards(ctx: StateContext<Cards>) {
    const state = ctx.getState();
    if (state.cards.length > 0) return;

    return this.#http.getQR().pipe(
      tap((data) => {
        console.log('Запрос выполнен: ', data);
        const state = ctx.getState();
        // console.log('state', state);
        ctx.patchState({
          cards: data,
          activeCard: data[0] ?? null,
        });
      }),
      catchError((error) => {
        // console.error(typeof error, error.status);
        ctx.patchState({
          error: error.message,
        });
        return of(null);
      }),
      take(1)
    );
  }
}
