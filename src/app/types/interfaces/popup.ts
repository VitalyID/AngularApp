import { Type } from '@angular/core';

export interface Popup {
  title?: string;
  id: string;
  state: boolean;
  component: Type<any> | null;
}
