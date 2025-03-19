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
export class AmodzieState {
  @Selector()
  static getGradeActive(state: AmodzieStateModel): number {
    console.log('selector: ', state.gradeActive);
    return state.gradeActive;
  }

  @Action(SetGradeActive)
  SetGradeActive(ctx: StateContext<AmodzieStateModel>, action: SetGradeActive) {
    ctx.setState({ gradeActive: action.GradeActive });
  }
}
