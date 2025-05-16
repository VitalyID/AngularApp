// import { Cards } from './cards.state';
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, concatMap, delay, of, take, tap, throwError } from 'rxjs';
import { GetDataQrService } from '../services/get-data-qr.service';
import { PostCardService } from '../services/post-data-qr.service';
import UpdateCards, { PostCard, UpdateEditCard } from './cards.action';

export interface UserCardState {
  cards: UserCard[];
  // editCard need for changing property and reactive displaying in preview component
  userCard: UserCard;
  error: string | null;
  retry: {
    current: number;
    max: number;
  };

  // isWaiting: boolean;
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

const defaultValue: UserCardState = {
  cards: [],
  userCard: {
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
  retry: {
    current: 0,
    max: 3,
  },
};

@State<UserCardState>({
  name: 'cards',
  defaults: defaultValue,
})
@Injectable()
export class ListOfCards {
  count = 0;

  readonly #httpGet = inject(GetDataQrService);
  readonly #httpPost = inject(PostCardService);
  readonly #store = inject(Store);

  // cards$: Observable<Cards> = this.#store.select(ListOfCards.getCards);

  @Selector()
  static getCards(state: UserCardState) {
    return state;
  }

  @Selector()
  static getEditCard(state: UserCardState) {
    return state.userCard;
  }

  @Action(UpdateEditCard)
  updateEditCard(
    ctx: StateContext<UserCardState>,
    { newValue }: UpdateEditCard
  ) {
    const userSet = ctx.getState();
    ctx.patchState({
      userCard: { ...userSet.userCard, [newValue['key']]: newValue['value'] },
    });

    // ctx.patchState({ userCard: newCard });
  }

  @Action(UpdateCards)
  updateCards(ctx: StateContext<UserCardState>) {
    console.log('vnsdfjhvdndfjhn');

    // const state = ctx.getState();

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
      }),
      take(1)
    );
  }

  @Action(PostCard)
  postCard(ctx: StateContext<UserCardState>, action: PostCard) {
    console.log('callback action', action);

    return this.#httpPost.post(action.newCard).pipe(
      tap((data) => {
        const currentState = ctx.getState();

        ctx.patchState({
          // reset to defaultValue when send to server is success
          userCard: {
            ...defaultValue.userCard,
          },
          error: null,
          retry: { ...currentState.retry, current: 0 },
        });
      }),

      catchError((error) => {
        console.log('При вызове сервиса произошли ошибки', error);

        const currentState = ctx.getState();

        // increase a counter attempt to send data to server
        ctx.patchState({
          retry: {
            ...currentState.retry,
            current: currentState.retry.current + 1,
          },
        });

        if (ctx.getState().retry.max === ctx.getState().retry.current) {
          console.log('Попытки завершены.');
          return of();
        } else {
          // repeat to send data to server when a counter not equal max value

          of(null)
            .pipe(
              delay(2000),
              concatMap(() => {
                return this.#store.dispatch(
                  new PostCard(ctx.getState().userCard)
                );
              })
            )
            .subscribe();
          // this.#store.dispatch(new PostCard(ctx.getState().userCard));

          ctx.patchState({
            error: error,
          });
        }

        return throwError(() => {
          error;
        });
      })
    );
  }
}
