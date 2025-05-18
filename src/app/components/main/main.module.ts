import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { NgxsModule } from '@ngxs/store';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { TableComponent } from '../../shared/components/table/table.component';
// import { ListOfCards } from '../../state/cards.state';
import { ButtonsComponent } from '../../shared/components/buttons/buttons.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

@NgModule({
  imports: [
    ChartComponent,
    ButtonsComponent,
    TableComponent,
    CommonModule,
    // NgxsModule.forFeature([ListOfCards]),
    RouterModule,
    MainRoutingModule,
  ],
  exports: [],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule {}
