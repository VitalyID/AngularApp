import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQRcodeComponent } from './components/settingUser/create-qrcode.component';

const routes: Routes = [
  {
    path: '',
    component: CreateQRcodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQrcodeRoutingModule {}
