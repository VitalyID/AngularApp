// NOTE: titlePopUp - the name popup;
// NOTE: state - state: close or open;
// NOTE: component - components, each render in popup;
// NOTE: componentsProps - components, each send by @Input() from component

import { Type } from '@angular/core';

export interface Popup {
  titlePopUp?: string;
  state: boolean;
  component: Type<any> | null;
  componentProps?: any;
}
