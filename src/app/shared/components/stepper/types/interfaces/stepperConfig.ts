import { Type } from '@angular/core';

// NOTE: stepperEnd - its parameter, which need for last gorizontal line in stapper component
export interface StepperConfig {
  component: Type<any>;
  stepNumber: number;
  isActive: boolean;
  stepperEnd: boolean;
}
