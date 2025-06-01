import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { HomeComponent } from './components/layouts/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'my-qr',
        loadChildren: () =>
          import('./components/myQR/my-qr.module').then(
            (m) => m.MyQRComponentModule
          ),
      },
      {
        path: 'create-qrcode/:id',
        loadChildren: () =>
          import('./components/QR-CodeCreator/qr-code-creator.module').then(
            (m) => m.CreateQrcodeModule
          ),
      },
      {
        path: 'create-qrcode',
        loadChildren: () =>
          import('./components/QR-CodeCreator/qr-code-creator.module').then(
            (m) => m.CreateQrcodeModule
          ),
      },
      {
        path: 'agents',
        loadChildren: () =>
          import('./components/agents/agents.module').then(
            (m) => m.AgentsModule
          ),
        // data: { asideID: 3 },
      },
    ],
  },

  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
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
