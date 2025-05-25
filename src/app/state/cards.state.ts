import { EditCard, PostCard } from './cards.action';
// import { Cards, UserCard } from './cards.state';
import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
// import { PostCardService } from '../services/post-data-qr.service';
import { CardService } from '../services/CardStoreActions.service';
import UpdateCards, { DeleteCard, UpdateEditCard } from './cards.action';

export interface UserCardState {
  cards: UserCard[];
  // editCard need for changing property and reactive displaying in preview component
  userCard: UserCard;
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
    background_hex_color: '#E7E9F0',
    business_payment_type: 'TIPS',
    button_hex_color: '#3FA949',
    commission_coverage: false,
    employee_display: true,
    id: 0,
    logo_file_id: '../../assets/images/logoDefault.png',
    platform_id: '',
    preset_payment_sizes: [100, 250, 500],
    qr_image: '',
    rating: false,
    reviews: false,
    smiles: false,
  },
};

@State<UserCardState>({
  name: 'cards',
  defaults: defaultValue,
})
@Injectable()
export class ListOfCards {
  count = 0;

  // readonly #httpGet = inject(GetDataQrService);
  readonly #http = inject(CardService);
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
  }

  @Action(UpdateCards)
  updateCards(ctx: StateContext<UserCardState>) {
    // const state = ctx.getState();
    return this.#http.getCard().pipe(
      take(1),
      tap((cards: UserCard[]) => {
        ctx.patchState({ cards: cards });
      })
    );
  }

  @Action(PostCard)
  postCard(ctx: StateContext<UserCardState>, { newCard }: PostCard) {
    return this.#http.postCard(newCard).pipe(
      take(1),
      tap(() => {
        ctx.patchState({
          // reset to defaultValue when send to server is success
          userCard: {
            ...defaultValue.userCard,
          },
        });
      })
    );
  }

  @Action(DeleteCard)
  deleteCard(ctx: StateContext<UserCardState>, { id }: DeleteCard) {
    return this.#http.deleteCard(id).pipe(
      take(1),
      tap(() => {
        this.#store.dispatch(new UpdateCards());
      })
    );
  }

  @Action(EditCard)
  editCard(ctx: StateContext<UserCardState>, { userCard }: EditCard) {
    ctx.patchState({
      userCard: userCard,
    });
  }
}
