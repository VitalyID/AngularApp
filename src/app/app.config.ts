import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  NgxsStoragePluginModule,
  NgxsStoragePluginOptions,
} from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './ app.routes';
import { AmodzieState } from './components/userSettingPage/user-setting-store/user-setting-store.state';

const storagePluginOptions: NgxsStoragePluginOptions = {
  keys: ['amodzie'],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    DatePipe,
    provideStore([AmodzieState]),
    NgxsStoragePluginModule.forRoot(storagePluginOptions).providers!,
  ],
};
