import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyQRComponent } from './my-qr.component';

const routes: Routes = [
  {
    path: '',
    component: MyQRComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyQrRoutingModule {}
