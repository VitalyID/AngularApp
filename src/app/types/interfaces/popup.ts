// NOTE: titlePopUp - the name popup;
// NOTE: state - state: close or open;
// NOTE: component - components, each render in popup;
// NOTE: componentsProps - components, each send by @Input() from component
// NOTE: name - its name popup, which mirror inner component. It's need for control. Ex, if user is created, and popup is opened, header-user.component isn't requesting to back for get user's first and last name.

import { Type } from '@angular/core';

export interface Popup {
  titlePopUp?: string;
  state: boolean;
  name: string;
  component: Type<any> | null;
  componentProps?: any;
}
