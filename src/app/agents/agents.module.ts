import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { ButtonsComponent } from '../components/buttons/buttons.component';
import { ColorPickerComponent } from '../components/userSettingPage/color-picker/color-picker.component';
import { StarsRateComponent } from '../components/userSettingPage/stars-rate/stars-rate.component';
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
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  exports: [AgentsComponent],
})
export class AgentsModule {}
