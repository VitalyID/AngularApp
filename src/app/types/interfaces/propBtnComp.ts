import { Component, Type } from '@angular/core';

export interface PropBtnComponent {
  isActive: true;
  prop: Type<Component> | null;
  source: Type<Component>[] | null;
}
