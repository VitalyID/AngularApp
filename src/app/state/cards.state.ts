import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { isAuthResponse, isCreateUserResponse } from '../services/auth.helper';
import { AuthService } from '../services/auth.service';
import { CardService } from '../services/CardStoreActions.service';
import { LocalStorigeService } from '../services/local-storige.service';
import {
  CardsMeta,
  PaginationMeta,
} from '../shared/components/pagination/interface/PaginationMeta';
import UpdateCards, {
  AuthUser,
  DeleteCard,
  EditCard,
  PostCard,
  PutCard,
  UpdateEditCard,
} from './cards.action';
// import { UserCardState } from './cards.state';

export interface UserCardState {
  cards: UserCard[];
  // editCard need for changing property and reactive displaying in preview component
  userCard: UserCard;
  pagination: PaginationMeta;
  user: UserData;
}

export interface UserData {
  phone: string;
  password: string;
  token: string;
  userCreated: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface CreateUserResponse {
  phone: '';
  id: number;
  created_at: '';
  updated_at: '';
}

export interface UserCard {
  background_hex_color: string;
  business_payment_type: string;
  button_hex_color: string;
  commission_coverage: boolean;
  employee_display: boolean;
  id: number;
  logo_file_id: number | null | string;
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
    logo_file_id: 0,
    preset_payment_sizes: [100, 250, 500],
    qr_image: '',
    rating: false,
    reviews: false,
    smiles: false,
  },
  pagination: {
    limit: 12,
    total: 1,
    offset: 1,
  },
  user: {
    phone: '',
    password: '',
    token: '',
    userCreated: '',
  },
};

@State<UserCardState>({
  name: 'cards',
  defaults: defaultValue,
})
@Injectable()
export class ListOfCards {
  count = 0;

  readonly #http = inject(CardService);
  readonly #store = inject(Store);
  readonly #auth = inject(AuthService);
  readonly #lSS = inject(LocalStorigeService);
  readonly #router = inject(Router);

  @Selector()
  static getCards(state: UserCardState) {
    return state;
  }

  @Selector()
  static getUserData(state: UserCardState) {
    return state.user;
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
  updateCards(ctx: StateContext<UserCardState>, { rangeCards }: UpdateCards) {
    const state = ctx.getState();
    console.log('state-user', state.user);

    // ctx.patchState({
    //   user: { ...state, token: this.#lSS.getLocalStorige() },
    // });

    // this.#lSS.getLocalStorige();

    return this.#http.getCard(rangeCards, state.pagination.limit).pipe(
      tap((data) => {
        console.log(data);
      }),
      take(1),
      tap(({ data, pagination }: CardsMeta) => {
        ctx.patchState({ cards: data, pagination });
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
        this.#store.dispatch(new UpdateCards(0));
      })
    );
  }

  @Action(EditCard)
  editCard(ctx: StateContext<UserCardState>, { userCard }: EditCard) {
    ctx.patchState({ userCard });
  }

  @Action(PutCard)
  putCArd(ctx: StateContext<UserCardState>, { userCard }: PutCard) {
    return this.#http.putCard(userCard.id, userCard).pipe(
      take(1),
      tap(() => {
        this.#store.dispatch(new UpdateCards(0));
      })
    );
  }

  @Action(AuthUser)
  AuthUser(ctx: StateContext<UserCardState>, { user }: AuthUser) {
    console.log('action', user);

    const stateUser = ctx.getState();
    return this.#auth.authUser(user.phone, user.password).pipe(
      take(1),
      tap((data) => {
        // isCreateUserResponse and isAuthResponse are helpers for types

        if (isCreateUserResponse(data)) {
          ctx.patchState({
            user: {
              ...stateUser.user,
              phone: user.phone,
              password: user.password,
              userCreated: data.updated_at,
            },
          });

          // get token
          ctx.dispatch(new AuthUser(user));
        } else if (isAuthResponse(data)) {
          // get data from storage
          const user = JSON.parse(this.#lSS.getLocalStorige());

          ctx.patchState({
            user: {
              phone: user.phone,
              password: user.password,
              token: data.access_token,
              userCreated: new Date().toString(),
            },
          }),
            this.#lSS.sendToLocalStorige(JSON.stringify(ctx.getState().user));
          console.log('localeStorage:', ctx.getState().user);
          this.#router.navigate(['']);
        }
      })
    );
  }
}
