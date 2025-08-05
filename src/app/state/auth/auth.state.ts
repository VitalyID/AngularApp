import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalStorigeService } from '../../services/local-storige.service';
import { CreateUser, LoginUser } from './auth.action';

export interface UserAuthStateModel {
  phone: string;
  id: number;
  access_token: string;
  tokenUpdated_at: string;
}

export interface UserAuthData {
  phone: string;
  password: string;
  token: string;
}

@State<UserAuthStateModel>({
  name: 'user',
  defaults: {
    phone: '',
    id: 0,
    access_token: '',
    tokenUpdated_at: '',
  },
})
@Injectable()
export class UserAuthState {
  readonly #auth = inject(AuthService);
  readonly #localStorageService = inject(LocalStorigeService);
  readonly #router = inject(Router);

  @Selector()
  static userAccount(state: UserAuthStateModel) {
    return state;
  }

  @Action(CreateUser)
  RegisterUser(ctx: StateContext<UserAuthStateModel>, { user }: CreateUser) {
    return this.#auth.registerUser(user.phone, user.password).pipe(
      take(1),
      tap((response) => {
        const state = ctx.getState();

        ctx.patchState({ ...state, phone: user.phone, id: response.id });
      }),
      tap(() => {
        this.#localStorageService.sendToLocalStorige(
          JSON.stringify(ctx.getState()),
        );
      }),
    );
  }

  @Action(LoginUser)
  LoginUser(ctx: StateContext<UserAuthStateModel>, { user }: LoginUser) {
    return this.#auth.login(user.phone, user.password).pipe(
      take(1),
      tap((response) => {
        if (!response.access_token) {
          console.log('debug: Token is none');
          return;
        }

        const state = ctx.getState();
        ctx.patchState({
          ...state,
          phone: user.phone,
          access_token: response.access_token,
          tokenUpdated_at: new Date().toString(),
        });

        this.#localStorageService.sendToLocalStorige(
          JSON.stringify(ctx.getState()),
        );
        this.#router.navigate(['']);
      }),
    );
  }
}
