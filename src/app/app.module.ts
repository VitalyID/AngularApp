import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AgentsRoutingModule } from './components/agents/agents-routing.module';
import { AgentsModule } from './components/agents/agents.module';

const storagePluginOptions: NgxsStoragePluginOptions = {
  keys: ['amodzie'],
};
@NgModule({
  declarations: [],
  imports: [BrowserModule, RouterModule, AgentsModule, AgentsRoutingModule],
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
    DatePipe,
  ],
  bootstrap: [],
})
export class AppModule {}

// MainComponent,
//     MyQRComponent,
//     AmodzieComponent,
// NavigationComponent, WrapFlexComponent
