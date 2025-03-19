import { State } from '@ngxs/store';
// import { AddAmodzi } from './user-setting-store.actions';
// import { AmodzieStateModel } from './user-setting-store.state';

export interface AmodzieStateModel {
  items: number;
}

@State<AmodzieStateModel>({
  name: 'ratingAmodzi',
  defaults: { items: 3 },
})
export class AmodzieState {
  // @Selector()
  // static getAmodzi(state: AmodziState): number {
  //   return state.emotion;
  // }
  // @Action (AddAmodzi)
  // AddAmodziToStore (ctx:StateContext<AmodzieStateModel>, action: AddAmodzi){
  //   const state = ctx.getState();
  //   ctx.getState({
  //     state.emotion = [...state.emotion]
  //   })
  // }
}
