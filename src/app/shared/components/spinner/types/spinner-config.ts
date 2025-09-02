import { Component, Type } from '@angular/core';

export interface SpinnerConfig {
  isActive: boolean;
  nameIcon: string;
  id?: string;
  source?: Type<Component> | null;
}
