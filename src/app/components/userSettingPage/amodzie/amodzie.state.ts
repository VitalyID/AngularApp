import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetGradeActive } from '../user-setting-store/user-setting-store.actions';

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
  static getGradeActive(state: AmodzieStateModel | null | undefined): number {
    if (!state) {
      console.warn('state is null or undefind');
      return 3;
    }
    console.log('selector: ', state.gradeActive);
    return state.gradeActive;
  }

  @Action(SetGradeActive)
  SetGradeActive(ctx: StateContext<AmodzieStateModel>, action: SetGradeActive) {
    console.log('Dispatching SetGradeActive:', action.GradeActive);

    if (action.GradeActive !== null && action.GradeActive !== undefined) {
      ctx.setState({ gradeActive: action.GradeActive });
    }
  }
}
