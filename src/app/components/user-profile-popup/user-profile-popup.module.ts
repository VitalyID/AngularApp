import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { SvgIconComponent } from '../../shared/components/svg-icon/svg-icon.component';
import { UserProfilePopupComponent } from './user-profile-popup.component';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';

@NgModule({
  imports: [
    StepperComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    ButtonsComponent,
    InputTextComponent,
  ],
  exports: [UserProfilePopupComponent],
  declarations: [UserProfilePopupComponent],
  providers: [],
})
export class UserProfilePopupModule {}
