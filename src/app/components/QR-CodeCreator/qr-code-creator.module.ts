import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateQRcodeComponent } from './components/tipQRCodeCreator/tipQRCodeCreator.component';
import { CreateQrcodeRoutingModule } from './qr-code-creator-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateQrcodeRoutingModule,
    CreateQRcodeComponent,
  ],
  providers: [

  ],
})
export class CreateQrcodeModule {}
