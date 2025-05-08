import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // data: { asideID: 1 },
  },

  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  // { path: 'my-qr', component: MyQRComponent },
  {
    path: 'my-qr',
    loadChildren: () =>
      import('./components/myQR/my-qr.module').then(
        (m) => m.MyQRComponentModule
      ),
  },
  {
    path: 'create-qrcode',
    loadChildren: () =>
      import('./components/QR-CodeCreator/qr-code-creator.module').then(
        (m) => m.CreateQrcodeModule
      ),
    // data: { asideID: 1 },
  },
  {
    path: 'agents',
    loadChildren: () =>
      import('./components/agents/agents.module').then((m) => m.AgentsModule),
    // data: { asideID: 3 },
  },
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];

export class AppRoutingModule {}
