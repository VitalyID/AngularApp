import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneAuthComponent } from './phone-auth.component';

export const routes: Routes = [{ path: '', component: PhoneAuthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneAuthRoutingModule {}
