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
