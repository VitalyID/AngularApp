import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartConfiguration, Colors, Legend , ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {defaults} from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Color } from 'chart.js';


@Component({
  selector: 'chart',
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChartComponent {
  public barChartLegend = false;
  public barChartPlugins = [Legend];

   public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ] },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      colors : {
        forceOverride : true
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 14,
            family: 'Formular',
            weight: 600
          }
        }
      },
      y: {
        ticks: {
          color: '#101112',
          font: {
            size: 14,
            family: 'Formular'
          }
        }
      }
    },

  }
  ;

  constructor() {
  }
}
