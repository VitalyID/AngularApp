import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { CustomRadioButtonComponent } from '../../shared/components/custom-radio-button/custom-radio-button.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { SvgIconComponent } from '../../shared/components/svg-icon/svg-icon.component';
import { UserProfilePopupComponent } from './user-profile-popup.component';

@NgModule({
  imports: [
    StepperComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    ButtonsComponent,
    InputTextComponent,
    DropdownComponent,
    CommonModule,
    CustomRadioButtonComponent,
  ],
  exports: [UserProfilePopupComponent],
  declarations: [UserProfilePopupComponent],
  providers: [],
})
export class UserProfilePopupModule {}
