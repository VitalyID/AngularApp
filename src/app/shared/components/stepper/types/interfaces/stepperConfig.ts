import { Type } from '@angular/core';

// NOTE: stepperEndLine - its parameter, which need for last gorizontal line in stapper component
export interface StepperConfig {
  component: Type<any>;
  stepNumber: number;
  isActive: boolean;
  stepperEndLine: boolean;
}
