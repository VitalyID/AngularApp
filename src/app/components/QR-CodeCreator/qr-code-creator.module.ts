import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule, provideStates, provideStore } from '@ngxs/store';
import { ListOfCards } from '../../state/cards.state';
import { CreateQRcodeComponent } from './components/tipQRCodeCreator/tipQRCodeCreator.component';
import { CreateQrcodeRoutingModule } from './qr-code-creator-routing.module';
import { CreateQRcodeState } from './state/qr-code-creator.state';

// export const CUSTOM_NGXS_EXECUTION_STRATEGY =
//   new InjectionToken<NgxsExecutionStrategy>('CUSTOM_NGXS_EXECUTION_STRATEGY');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateQrcodeRoutingModule,
    CreateQRcodeComponent,
    // NgxsModule.forFeature([AmodzieState]),
    NgxsModule.forFeature([ListOfCards]),
  ],
  providers: [
    provideStore(),
    provideStates([
      // SetUserTips,
      // SetUserStarRate,
      // userFeedbackState,
      // AmodzieState,
      // SubstrateColor,
      // myValidatorDirective,
      CreateQRcodeState,
      // ListOfCards,
    ]),
  ],
})
export class CreateQrcodeModule {}
