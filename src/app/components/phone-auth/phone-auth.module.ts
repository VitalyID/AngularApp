import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SvgIconComponent } from '../../shared/components/svg-icon/svg-icon.component';
import { SwitcherComponent } from '../../shared/components/switcher/switcher.component';
import { TextAreaComponent } from '../../shared/components/text-area/text-area.component';
import { PhoneAuthComponent } from './phone-auth.component';
import { PhoneAuthRoutingModule } from './phone-auth.routing';

@NgModule({
  imports: [
    PhoneAuthRoutingModule,
    SvgIconComponent,
    TextAreaComponent,
    InputTextComponent,
    SwitcherComponent,
    ButtonsComponent,
    CommonModule,
    SpinnerComponent,
  ],
  exports: [],
  declarations: [PhoneAuthComponent],
  providers: [],
})
export class PhoneAuthModule {}
