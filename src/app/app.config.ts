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
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ListOfCards } from './state/cards.state';
// import { provideNgxs } from '@ngxs/store'
// import { UploadLogoState } from './components/QR-CodeCreator/state/qr-code-creator.state';

const storagePluginOptions: NgxsStoragePluginOptions = {
  keys: ['amodzie'],
};

export const CUSTOM_NGXS_EXECUTION_STRATEGY =
  new InjectionToken<NgxsExecutionStrategy>('CUSTOM_NGXS_EXECUTION_STRATEGY');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([ErrorInterceptor])),
    provideCharts(withDefaultRegisterables()),
    DatePipe,
    // provideStore([]),
    importProvidersFrom(
      MainModule,
      MyQRComponentModule,
      NgxsModule.forRoot([ListOfCards])
    ),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    provideAnimations(),
  ],
};
