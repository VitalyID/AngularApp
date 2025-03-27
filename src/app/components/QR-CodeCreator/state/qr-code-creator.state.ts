import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LogoProfileDefaultSource } from '../../../types/enums/logoProfile';
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

export interface UserSetTipModel {
  [key: string]: number;
}

const inputTips = {
  'inputID-1': 100,
  'inputID-2': 150,
  'inputID-3': 200,
};

@State<UserSetTipModel>({
  name: 'setTip',
  defaults: inputTips,
})
@Injectable()
export class SetUserTips {
  @Selector()
  static getUserTips(state: UserSetTipModel) {
    return state;
  }

  @Action(AddUserTips)
  AddUserTips(ctx: StateContext<UserSetTipModel>, action: AddUserTips) {
    const stateUserTip1 = ctx.getState();
    const stateUserTip2 = ctx.getState();
    const stateUserTip3 = ctx.getState();

    console.log('стор получил tip1 юзер: ', stateUserTip1);
    console.log('стор получил tip2 юзер: ', stateUserTip2);
    console.log('стор получил tip3 юзер: ', stateUserTip3);

    ctx.setState({
      placeholder1: action.userTip.placeholder1,
      placeholder2: action.userTip.placeholder2,
      placeholder3: action.userTip.placeholder3,
    });
  }
}
