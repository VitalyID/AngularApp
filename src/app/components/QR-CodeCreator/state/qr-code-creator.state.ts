import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LogoProfileDefaultSource } from '../../../types/enums/logoProfile';
import { InputUsers } from './../types/interface/inputUsers';
import { AddUploadLogo, AddUserTips } from './qr-code-creator.action';

export interface UploadLogo {
  logo: string;
}

@State<UploadLogo>({
  name: 'userlogo',
  defaults: {
    logo: LogoProfileDefaultSource.logoSource,
  },
})
@Injectable()
export class UploadLogoState {
  @Selector()
  static getUploadLogo(state: UploadLogo) {
    return state.logo;
  }

  @Action(AddUploadLogo)
  AddUploadLogo(ctx: StateContext<UploadLogo>, { userLogo }: AddUploadLogo) {
    const stateUploadLogo = ctx.getState();
    console.log('стор получил лого юзер: ', stateUploadLogo);
    ctx.setState({ logo: userLogo });
  }
}

// =================================
// =================================
// =================================
export interface InputUsersModel {
  'inputID-1': number;
  'inputID-2': number;
  'inputID-3': number;
}

const inputTips: InputUsersModel = {
  'inputID-1': 100,
  'inputID-2': 150,
  'inputID-3': 200,
};

@State<InputUsersModel>({
  name: 'setTip',
  defaults: inputTips,
})
@Injectable()
export class SetUserTips {
  @Selector()
  static getUserTips(state: InputUsers) {
    return state;
  }

  @Action(AddUserTips)
  AddUserTips(ctx: StateContext<InputUsersModel>, action: AddUserTips) {
    const stateUserTip = ctx.getState();
    console.log('стор получил tip юзер: ', stateUserTip);
    ctx.setState({ ...stateUserTip, ...action.userTip });
  }
}
