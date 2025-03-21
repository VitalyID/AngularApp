import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import {
  NgxsExecutionStrategy,
  NgxsModule,
  provideStates,
  provideStore,
} from '@ngxs/store';
import { CreateQRcodeComponent } from './components/settingUser/create-qrcode.component';
import { CreateQrcodeRoutingModule } from './create-qrcode-routing.module';
import { AmodzieState } from './state/amodzie.state';

export const CUSTOM_NGXS_EXECUTION_STRATEGY =
  new InjectionToken<NgxsExecutionStrategy>('CUSTOM_NGXS_EXECUTION_STRATEGY');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateQrcodeRoutingModule,
    CreateQRcodeComponent,
    NgxsModule.forFeature([AmodzieState]),
  ],
  providers: [provideStore(), provideStates([AmodzieState])],
})
export class CreateQrcodeModule {}
