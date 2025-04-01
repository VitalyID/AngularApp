import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LogoProfileDefaultSource } from '../../../types/enums/logoProfile';
import { InputUsers } from './../types/interface/inputUsers';
import {
  AddUploadLogo,
  AddUserAmodzie,
  AddUserBTNcolor,
  AddUserFeedback,
  AddUserStarRate,
  AddUserSubstrateColor,
  AddUserTips,
} from './qr-code-creator.action';

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

export interface StarRateModel {
  rate: number;
}

export interface userFeedbackModel {
  text: string;
}

export interface AmodzieModel {
  rate: number;
}

export interface SubstrateModel {
  color: string;
}

export interface UploadLogoModel {
  logo: string;
}

export interface btnColorModel {
  color: string;
}

// ===================================================
// ===================================================
// ===================================================

const userStar: StarRateModel = {
  rate: 2,
};
const userFeedback: userFeedbackModel = {
  text: 'bla-bla-bla',
};
const defaultAmodzie: AmodzieModel = {
  rate: 3,
};
const userSubstrateColor: SubstrateModel = {
  color: '#eeeff2',
};
const userDefaultLogo: UploadLogoModel = {
  logo: LogoProfileDefaultSource.logoSource,
};
const defaultBtnColor: btnColorModel = { color: '#eeeff2' };

// ===================================================
// ===================================================
// ===================================================

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

// =================================

@State<StarRateModel>({
  name: 'rate',
  defaults: userStar,
})
@Injectable()
export class SetUserStarRate {
  @Selector()
  static getUserStarRate(state: StarRateModel) {
    return state;
  }

  @Action(AddUserStarRate)
  AddUserStarRate(
    ctx: StateContext<StarRateModel>,
    { userRate }: AddUserStarRate
  ) {
    const stateRate = ctx.getState();
    console.log('stars: ', stateRate);
    ctx.setState({ rate: userRate });
  }
}

// =================================

@State<userFeedbackModel>({
  name: 'feedbackText',
  defaults: userFeedback,
})
@Injectable()
export class userFeedbackState {
  @Selector()
  static getMyFeedback(state: userFeedbackModel) {
    return state;
  }

  @Action(AddUserFeedback)
  AddUserFeedback(
    ctx: StateContext<userFeedbackModel>,
    { userFeedback }: AddUserFeedback
  ) {
    const text = ctx.getState();
    console.log('text: ', text);
    ctx.setState({ text: userFeedback });
  }
}

// =================================

@State<AmodzieModel>({
  name: 'amodzie',
  defaults: defaultAmodzie,
})
@Injectable()
export class AmodzieState {
  @Selector()
  static getAmodzieState(state: AmodzieModel) {
    return state;
  }

  @Action(AddUserAmodzie)
  AddUserAmodzie(
    ctx: StateContext<AmodzieModel>,
    { userAmodzie }: AddUserAmodzie
  ) {
    const state = ctx.getState();
    console.log('Amodzie: ', state);
    ctx.setState({ rate: userAmodzie });
  }
}

// =================================

@State<SubstrateModel>({
  name: 'userColor',
  defaults: userSubstrateColor,
})
@Injectable()
export class SubstrateColor {
  @Selector()
  static getColorSubstrate(state: SubstrateModel) {
    return state.color;
  }

  @Action(AddUserSubstrateColor)
  AddUserSubstrateColor(
    ctx: StateContext<SubstrateModel>,
    { userSubstrateColor }: AddUserSubstrateColor
  ) {
    const color = ctx.getState();
    console.log('Цвет подложки: ', color);
    ctx.setState({ color: userSubstrateColor });
  }
}

// =================================

@State<btnColorModel>({
  name: 'userColor',
  defaults: defaultBtnColor,
})
@Injectable()
export class btnColor {
  @Selector()
  static getColorSubstrate(state: btnColorModel) {
    return state.color;
  }

  @Action(AddUserBTNcolor)
  AddUserBTNcolor(
    ctx: StateContext<btnColorModel>,
    { userBTNcolor }: AddUserBTNcolor
  ) {
    const color = ctx.getState();
    console.log('Цвет подложки: ', color);
    ctx.setState({ color: userBTNcolor });
  }
}

// =================================

@State<UploadLogoModel>({
  name: 'userlogo',
  defaults: userDefaultLogo,
})
@Injectable()
export class UploadLogoState {
  @Selector()
  static getUploadLogo(state: UploadLogoModel) {
    return state.logo;
  }

  @Action(AddUploadLogo)
  AddUploadLogo(
    ctx: StateContext<UploadLogoModel>,
    { userLogo }: AddUploadLogo
  ) {
    const stateUploadLogo = ctx.getState();
    console.log('стор получил лого юзер: ', stateUploadLogo);
    ctx.setState({ logo: userLogo });
  }
}
