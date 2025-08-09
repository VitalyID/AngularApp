import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminPanelGuard } from './admin-panel.guard';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { HomeComponent } from './components/layouts/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        canActivate: [adminPanelGuard],
        loadChildren: () =>
          import('./components/main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'my-qr',
        loadChildren: () =>
          import('./components/myQR/my-qr.module').then(
            (m) => m.MyQRComponentModule,
          ),
      },
      {
        path: 'create-qrcode/:id',
        loadChildren: () =>
          import('./components/QR-CodeCreator/qr-code-creator.module').then(
            (m) => m.CreateQrcodeModule,
          ),
      },
      {
        path: 'create-qrcode',
        loadChildren: () =>
          import('./components/QR-CodeCreator/qr-code-creator.module').then(
            (m) => m.CreateQrcodeModule,
          ),
      },
      {
        path: 'agents',
        loadChildren: () =>
          import('./components/agents/agents.module').then(
            (m) => m.AgentsModule,
          ),
      },
      {
        path: 'personal-data/:edit',
        loadChildren: () =>
          import('./components/personal-data/personal-data.module').then(
            (m) => m.PersonalDataModule,
          ),
      },
      {
        path: 'personal-data/:create',
        loadChildren: () =>
          import('./components/personal-data/personal-data.module').then(
            (m) => m.PersonalDataModule,
          ),
      },
      {
        path: 'personal-data',
        loadChildren: () =>
          import('./components/personal-data/personal-data.module').then(
            (m) => m.PersonalDataModule,
          ),
      },
      {
        path: 'requisites',
        loadChildren: () =>
          import('./components/card-details/card-details.module').then(
            (m) => m.CardDetailsModule,
          ),
      },
    ],
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'user-auth/:login',
    loadChildren: () =>
      import('./components/phone-auth/phone-auth.module').then(
        (m) => m.PhoneAuthModule,
      ),
  },
  {
    path: 'user-auth',
    loadChildren: () =>
      import('./components/phone-auth/phone-auth.module').then(
        (m) => m.PhoneAuthModule,
      ),
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
