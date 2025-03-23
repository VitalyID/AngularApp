import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetGradeActive } from './amodzie.action';

export interface AmodzieStateModel {
  gradeActive: number;
}

@State<AmodzieStateModel>({
  name: 'amodzie',
  defaults: {
    gradeActive: 3,
  },
})
@Injectable()
export class AmodzieState {
  @Selector()
  static getGradeActive(state: AmodzieStateModel): number {
    return state.gradeActive;
  }

  @Action(SetGradeActive)
  SetGradeActive(
    ctx: StateContext<AmodzieStateModel>,
    { GradeActive }: SetGradeActive
  ) {
    ctx.setState({ gradeActive: GradeActive });
  }
}
