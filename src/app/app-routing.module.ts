import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { HomeComponent } from './components/layouts/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // children: [
    //   { path: 'my-qr', component: MyQRComponent },
    //   {
    //     path: '',
    //     redirectTo: 'default',
    //     pathMatch: 'full',
    //   },
    //   {
    //     path: 'default',
    //     component: MainComponent,
    //   },
    // ],
    data: { asideID: 1 },
  },
  {
    path: '',
    redirectTo: 'home',
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
