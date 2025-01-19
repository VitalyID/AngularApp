import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartConfiguration, Colors, Legend , ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {defaults} from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Color } from 'chart.js';
import { TransmitDataToChartService } from '../../services/transmit-data-to-chart.service';
import { Subscription } from 'rxjs';



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
    labels: [],
    datasets: [
      { data: [] },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
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
        // padding: 20,
        ticks: {
          color: 'black',
          font: {
            size: 14,
            family: 'Formular',
            weight: 600
          }
        },
      },
      y: {
        ticks: {
          color: '#101112',
          font: {
            size: 14,
            family: 'Formular'
          }, maxTicksLimit: 10,
          stepSize: 2000
        }
      }
    },

  };
  private dataXSubscription !: Subscription;
  private dataYSubscription !: Subscription;

    constructor(private dataFromTable: TransmitDataToChartService) {
      this.dataXSubscription = dataFromTable.dataX$.subscribe (dataX => {this.barChartData.labels = dataX});
      this.barChartData = {...this.barChartData}

      this.dataYSubscription = dataFromTable.dataY$.subscribe (dataY => {this.barChartData.datasets[0].data = dataY});
      this.barChartData = {...this.barChartData}
    }

    ngOnDestroy():void {
      if(this.dataXSubscription) {
        this.dataXSubscription.unsubscribe
      }
      if( this.dataYSubscription) {
        this.dataYSubscription.unsubscribe
      }
    }

}
