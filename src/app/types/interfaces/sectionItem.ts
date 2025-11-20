import { Component, Type } from '@angular/core';
import { SpinnerConfig } from '../../shared/components/spinner/types/interfaces/spinnerConfig';

export interface ButtonConfig {
  text?: string;
  iconClass?: string;
  disabled?: boolean;
  background?: string;
  color?: string;
  isActive?: boolean;
  id?: string;
  borderStyle?: string;
  borderRadius?: string;
  boxShadow?: string;
  paddings?: string;
  innerComponent?: SpinnerConfig;
}
