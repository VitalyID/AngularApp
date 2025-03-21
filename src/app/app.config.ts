import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { NgxsExecutionStrategy, provideStore } from '@ngxs/store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './ app.routes';

const storagePluginOptions: NgxsStoragePluginOptions = {
  keys: ['amodzie'],
};

export const CUSTOM_NGXS_EXECUTION_STRATEGY =
  new InjectionToken<NgxsExecutionStrategy>('CUSTOM_NGXS_EXECUTION_STRATEGY');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    DatePipe,
    provideStore([]),
    // NgxsStoragePluginModule.forRoot(storagePluginOptions).providers!,
  ],
};
