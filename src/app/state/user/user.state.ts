import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EMPTY } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { RegistrationTypeComponent } from '../../shared/components/registration-type/registration-type.component';
import { RegistrationFormComponent } from '../../shared/components/restration-form/registration-form.component';
import { UpdateUser } from './user.action';
import { StateUserModel } from './user.models';

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
      card: {
        card_number: '1234123412341234',
        expiry: '12/12',
        cvc: '123',
      },
    },
  },
})
@Injectable()
export class UserState {
  readonly #http = inject(UserInfoService);

  @Selector()
  static getUserInfo(state: StateUserModel) {
    return state.userProfile;
  }

  @Action(UpdateUser)
  updateUser(
    ctx: StateContext<StateUserModel>,
    { info, isNewUser }: UpdateUser,
  ) {
    const oldUser = ctx.getState().userProfile;
    ctx.patchState({ userProfile: { ...oldUser, ...info } });

    if (
      info.currentComponent === RegistrationFormComponent ||
      info.currentComponent === RegistrationTypeComponent
    )
      return EMPTY;

    delete info.currentComponent;

    return isNewUser
      ? this.#http.putUserInfo(ctx.getState().userProfile)
      : this.#http.postUserInfo(ctx.getState().userProfile);
  }
}
