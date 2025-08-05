import { NgModule } from '@angular/core';

import { PersonalDataComponent } from './personal-data.component';
import { PersonalDataRoutingModule } from './personal-data.routing';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    PersonalDataRoutingModule,
    InputTextComponent,
    DropdownComponent,
    CommonModule,
  ],
  exports: [],
  declarations: [PersonalDataComponent],
  providers: [],
})
export class PersonalDataModule {}
