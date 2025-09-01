import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EMPTY, Observable, take, tap } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { GetUserInfo, UpdateBankCards, UpdateUser } from './user.action';
import { BankCard, StateUser, StateUserModel } from './user.models';
import { typeBankCard } from './user.utils';

@State<StateUserModel>({
  name: 'userProfile',
  defaults: {
    userProfile: {
      first_name: '',
      last_name: '',
      email: '',
      country: '',
      city: '',
      client_type: 'payer',
      cards: [
        {
          card_number: '1234123412341234',
          expiry: '12/12',
          cvc: '123',
          isActive: false,
        },
      ],
    },
  },
})
@Injectable()
export class UserState {
  readonly #http = inject(UserInfoService);

  @Selector()
  static getUserInfo(state: StateUserModel): StateUser {
    return {
      ...state.userProfile,
    };
  }

  @Selector()
  static getActiveCard(state: StateUserModel): BankCard {
    return (
      state.userProfile.cards.find((card) => card.isActive === true) ?? {
        card_number: '0000000000000000',
        expiry: '00/00',
        cvc: '000',
        isActive: true,
      }
    );
  }

  // NOTE: If user update personal information after some time info:UpdateUserInfo, isNewUser === true;

  @Action(UpdateUser)
  updateUser(
    ctx: StateContext<StateUserModel>,
    { info, isNewUser }: UpdateUser,
  ): Observable<any> {
    const oldUser = ctx.getState().userProfile;
    ctx.patchState({ userProfile: { ...oldUser, ...info } });

    const { cards, ...state } = ctx.getState().userProfile;

    if (!cards.length || !Object.values(state).every((value) => value !== null))
      return EMPTY;

    if (isNewUser) console.log('debug PUT state:', info);

    return isNewUser
      ? this.#http.postUserInfo(ctx.getState().userProfile)
      : this.#http.putUserInfo(ctx.getState().userProfile);
  }

  @Action(GetUserInfo)
  getUserInfo(ctx: StateContext<StateUserModel>) {
    return this.#http.getUserService().pipe(
      take(1),
      tap((userInfo: StateUser) => {
        if (typeof userInfo.cards === 'string') {
          const parseCards = JSON.parse(userInfo.cards);
          userInfo = { ...userInfo, cards: parseCards };
        }

        const cardsWithLogo = userInfo.cards.map((card) => ({
          ...card,
          typeCard: typeBankCard(),
        }));

        ctx.patchState({
          userProfile: { ...userInfo, cards: cardsWithLogo },
        });
      }),
    );
  }

  @Action(UpdateBankCards)
  updateCards(ctx: StateContext<StateUserModel>, { cards }: UpdateBankCards) {
    const oldUserInfo = ctx.getState().userProfile;

    ctx.patchState({
      userProfile: { ...oldUserInfo, cards: [...cards] },
    });

    console.log('debug put bankcard: ', ctx.getState().userProfile);

    return this.#http.putUserInfo(ctx.getState().userProfile).pipe(
      tap(() => {
        ctx.dispatch(new GetUserInfo());
      }),
    );
  }
}
