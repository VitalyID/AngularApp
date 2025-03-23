import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { MainComponent } from './components/main/main.component';
import { MyQRComponent } from './components/myQR/my-qr.component';

export const routes: Routes = [
  {
    path: 'home',
    component: MainComponent,
    data: { asideID: 1 },
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'my-qr', component: MyQRComponent, data: { asideID: 2 } },
  {
    path: 'create-qrcode',
    loadChildren: () =>
      import('./components/QR-CodeCreator/qr-code-creator.module').then(
        (m) => m.CreateQrcodeModule
      ),
    data: { asideID: 1 },
  },
  {
    path: 'agents',
    loadChildren: () =>
      import('./components/agents/agents.module').then((m) => m.AgentsModule),
    data: { asideID: 3 },
  },
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];

export class AppRoutingModule {}
