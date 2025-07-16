import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { CustomCheckBoxComponent } from '../../shared/components/custom-check-box/custom-check-box.component';
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
    CustomCheckBoxComponent,
  ],
  exports: [UserProfilePopupComponent],
  declarations: [UserProfilePopupComponent],
  providers: [],
})
export class UserProfilePopupModule {}
