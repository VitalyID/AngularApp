import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LogoProfileDefaultSource } from '../../../../types/enums/logoProfile';
import { AddUploadLogo } from './uploadLogo.actions';

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
