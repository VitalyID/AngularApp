import { NgModule } from '@angular/core';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { UserProfilePopupComponent } from './user-profile-popup.component';

@NgModule({
  imports: [StepperComponent],
  exports: [UserProfilePopupComponent],
  declarations: [UserProfilePopupComponent],
  providers: [],
})
export class UserProfilePopupModule {}
