import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AppRoutingModule } from './ app.routes';
import { AgentsRoutingModule } from './components/agents/agents-routing.module';
import { AgentsModule } from './components/agents/agents.module';
import { MainModule } from './components/main/main.module';

const storagePluginOptions: NgxsStoragePluginOptions = {
  keys: ['amodzie'],
};
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule,
    MainModule,
    AppRoutingModule,
    AgentsModule,
    AgentsRoutingModule,
    // NgxsModule.forRoot([ListOfCards]),
    // MyQRComponentModule,
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
    DatePipe,
  ],
  bootstrap: [],
})
export class AppModule {}
