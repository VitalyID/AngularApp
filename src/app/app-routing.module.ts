import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQRcodeComponent } from './components/create-qrcode/components/settingUser/create-qrcode.component';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { MainComponent } from './components/main/main.component';
import { MyQRComponent } from './components/my-qr/my-qr.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainComponent,
    data: { asideID: 1 },
  },
  { path: 'my-qr', component: MyQRComponent, data: { asideID: 2 } },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'create-qrcode',
    component: CreateQRcodeComponent,
    data: { asideID: 1 },
  },
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
