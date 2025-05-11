// import { Cards } from './cards.state';
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, Observable, of, tap } from 'rxjs';
import { GetDataQrService } from '../services/get-data-qr.service';
import UpdateCards from './cards.action';

export interface Cards {
  cards: UserCard[];
  // activeCard: UserCard;
  error: string | null;
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
  preset_payment_sizes: number[];
  qr_image: string;
  rating: boolean;
  reviews: boolean;
  smiles: boolean;
}

const defaultValue: Cards = {
  cards: [
    {
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
  ],
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
    // console.log('Данные в стейте: ', state);
    return state;
  }

  @Action(UpdateCards)
  updateCards(ctx: StateContext<Cards>) {
    // console.trace('UpdateCards вызван из:');
    // console.log(3333);

    const state = ctx.getState();
    // console.log(1111, state);

    if (state.cards.length > 1 || state.error) return;

    return this.#http.getQR().pipe(
      tap((data) => {
        console.log('данные из http: ', data);
        // const state = ctx.getState();
        // console.log('текущий стейт', state);
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
}
