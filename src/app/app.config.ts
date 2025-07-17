import { DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  InjectionToken,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { NgxsExecutionStrategy, NgxsModule } from '@ngxs/store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideToastr } from 'ngx-toastr';
import { routes } from './ app.routes';
import { MainModule } from './components/main/main.module';
import { MyQRComponentModule } from './components/myQR/my-qr.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { UserAuthState } from './state/auth/auth.state';
import { ListOfCards } from './state/cards/cards.state';

const storagePluginOptions: NgxsStoragePluginOptions = {
  keys: ['amodzie'],
};

export const CUSTOM_NGXS_EXECUTION_STRATEGY =
  new InjectionToken<NgxsExecutionStrategy>('CUSTOM_NGXS_EXECUTION_STRATEGY');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([SpinnerInterceptor, AuthInterceptor, ErrorInterceptor])
    ),
    provideCharts(withDefaultRegisterables()),
    DatePipe,
    importProvidersFrom(
      MainModule,
      MyQRComponentModule,
      NgxsModule.forRoot([ListOfCards, UserAuthState])
    ),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    provideAnimations(),
  ],
};
