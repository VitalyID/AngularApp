import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetColorPicker } from './color-picker.actions';

export interface ColorPickerModel {
  color: string;
}

@State<ColorPickerModel>({
  name: 'color-picker',
  defaults: { color: '#eeeff2' },
})
export class ColorPickerState {
  @Selector()
  static getColorPicker(state: ColorPickerModel): string {
    return state.color;
  }

  @Action(SetColorPicker)
  SetColorPicker(ctx: StateContext<ColorPickerModel>, action: SetColorPicker) {
    ctx.setState({ color: action.Color });
  }
}
