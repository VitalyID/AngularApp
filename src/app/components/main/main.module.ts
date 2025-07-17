import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { TableComponent } from '../../shared/components/table/table.component';
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
  ],
  exports: [],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule {}
