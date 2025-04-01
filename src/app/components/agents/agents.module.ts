import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { ColorPickerComponent } from '../../shared/components/color-picker/color-picker.component';
import { StarsRateComponent } from '../../shared/components/stars-rate/stars-rate.component';
import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsComponent } from './agents.component';
import { ColorPickerStore } from './state/agents.state';

@NgModule({
  declarations: [AgentsComponent],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    ButtonsComponent,
    ColorPickerComponent,
    StarsRateComponent,
    NgxsModule.forRoot([ColorPickerStore]),
  ],
  exports: [AgentsComponent],
})
export class AgentsModule {}
