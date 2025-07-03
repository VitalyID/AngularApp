import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { UserProfilePopupModule } from '../user-profile-popup/user-profile-popup.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

@NgModule({
  imports: [
    ChartComponent,
    ButtonsComponent,
    TableComponent,
    CommonModule,
    RouterModule,
    MainRoutingModule,
    UserProfilePopupModule,
  ],
  exports: [],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule {}
