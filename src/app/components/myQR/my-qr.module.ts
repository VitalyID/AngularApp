import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { QrCardComponent } from '../../shared/components/qr-card/qr-card.component';
import { MyQRComponent } from './my-qr.component';
import { MyQrRoutingModule } from './my-qr.routing';

@NgModule({
  imports: [
    CommonModule,
    // NgxsModule.forFeature([ListOfCards]),
    QrCardComponent,
    ButtonsComponent,
    RouterModule,
    MyQrRoutingModule,
  ],
  exports: [],
  declarations: [MyQRComponent],
  providers: [],
})
export class MyQRComponentModule {}
