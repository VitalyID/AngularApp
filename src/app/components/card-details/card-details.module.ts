import { NgModule } from '@angular/core';
import { CardDetailsComponent } from './card-details.component';
import { CardDetailsRoutingModule } from './card-details.routing';
import { CustomRadioButtonComponent } from '../../shared/components/custom-radio-button/custom-radio-button.component';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { RegistrationCardComponent } from '../../shared/components/registration-card/registration-card.component';
import { BankCardComponent } from '../../shared/components/bank-card/bank-card.component';
import { CardPipe } from './pipe/card-number';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CardDetailsRoutingModule,
    CustomRadioButtonComponent,
    ButtonsComponent,
    RegistrationCardComponent,
    BankCardComponent,
    CardPipe,
    CommonModule,
  ],
  exports: [],
  declarations: [CardDetailsComponent],
  providers: [],
})
export class CardDetailsModule {}
