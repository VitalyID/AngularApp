import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule, provideStates, provideStore } from '@ngxs/store';
import { CreateQRcodeComponent } from './components/tipQRCodeCreator/tipQRCodeCreator.component';
import { CreateQrcodeRoutingModule } from './qr-code-creator-routing.module';
import { AmodzieState } from './state/amodzie.state';
import { SetUserStarRate, SetUserTips } from './state/qr-code-creator.state';

// export const CUSTOM_NGXS_EXECUTION_STRATEGY =
//   new InjectionToken<NgxsExecutionStrategy>('CUSTOM_NGXS_EXECUTION_STRATEGY');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateQrcodeRoutingModule,
    CreateQRcodeComponent,
    NgxsModule.forFeature([AmodzieState]),
  ],
  providers: [
    provideStore(),
    provideStates([AmodzieState, SetUserTips, SetUserStarRate]),
  ],
})
export class CreateQrcodeModule {}
