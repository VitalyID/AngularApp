import { Type } from '@angular/core';

export interface SpinnerConfig {
  isActive: boolean;
  container: Type<any>;
  insertComponent: Type<any>;
  id?: string;
}
