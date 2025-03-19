import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { LanguageComponent } from './components/language/language.component';
import { HeaderUserComponent } from './components/layouts/header-user/header-user.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { HomeComponent } from './components/layouts/home/home.component';
import { MainComponent } from './components/main/main.component';
import { MyQRComponent } from './components/my-qr/my-qr.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { WrapFlexComponent } from './components/wrap-flex/wrap-flex.component';
import { SharedModule } from './shared.module';
import { StoreModule } from './store.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EmptyRouteComponent,
    NavigationComponent,
    WrapFlexComponent,
    HeaderUserComponent,
    LanguageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    MainComponent,
    MyQRComponent,
    NgxsModule,
    StoreModule,
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
