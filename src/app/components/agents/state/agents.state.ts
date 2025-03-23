import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetColor } from './agents.actions';

export interface ColorPicker {
  color: string;
}

@State<ColorPicker>({
  name: 'colorPicker',
  defaults: {
    color: '#eeeff2',
  },
})
@Injectable()
export class ColorPickerStore {
  @Selector()
  static getColor(state: ColorPicker) {
    return state.color;
  }

  @Action(SetColor)
  handleSetColor(ctx: StateContext<ColorPicker>, { userColor }: SetColor) {
    const state = ctx.getState();
    console.log('Стор получил цвет: ', userColor);
    ctx.setState({ ...state, color: userColor });
  }
}
