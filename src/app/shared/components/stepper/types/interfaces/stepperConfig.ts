import { Type } from '@angular/core';

// NOTE: stepperEndLine - its parameter, which need for last gorizontal line in stapper component
// NOTE: component define component, which is visible in current step.
// NOTE: name is title of step and visual component.
export interface StepperConfig {
  component: Type<any>;
  stepNumber: number;
  isActive: boolean;
  stepperEndLine: boolean;
  name: string;
}
