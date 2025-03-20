import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  NgxsStoragePluginModule,
  NgxsStoragePluginOptions,
} from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MainComponent } from './components/main/main.component';
import { MyQRComponent } from './components/my-qr/my-qr.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AmodzieState } from './components/userSettingPage/amodzie/amodzie.state';
import { WrapFlexComponent } from './components/wrap-flex/wrap-flex.component';

const storagePluginOptions: NgxsStoragePluginOptions = {
  keys: ['amodzie'],
};
@NgModule({
  declarations: [NavigationComponent, WrapFlexComponent],
  imports: [BrowserModule, RouterModule, MainComponent, MyQRComponent],
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
    DatePipe,
    provideStore([AmodzieState]),
    NgxsStoragePluginModule.forRoot(storagePluginOptions).providers!,
  ],
})
export class AppModule {}
