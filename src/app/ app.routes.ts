// import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { MainComponent } from './components/main/main.component';
import { MyQRComponent } from './components/my-qr/my-qr.component';

export const routes: Routes = [
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
    loadChildren: () =>
      import(
        './components/userSettingPage/create-qrcode/create-qrcode.module'
      ).then((m) => m.CreateQrcodeModule),
    data: { asideID: 1 },
  },
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];

export class AppRoutingModule {}
