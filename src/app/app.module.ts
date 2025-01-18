import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LanguageComponent } from './components/language/language.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { WrapFlexComponent } from './components/wrap-flex/wrap-flex.component';
import { SharedModule } from './shared.module';
import { MainComponent } from './components/main/main.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

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
  imports: [BrowserModule, AppRoutingModule, RouterModule, SharedModule, MainComponent],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
