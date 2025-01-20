import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartConfiguration, Colors, Legend , ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {defaults} from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Color } from 'chart.js';
import { TransmitDataService } from '../../services/transmit-data.service';
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

  // private dataXSubscription ?: Subscription;
  // private dataYSubscription ?: Subscription;

  //   constructor(private dataFromService : TransmitOperationService) {
  //     this.dataXSubscription = dataFromService.dataX$.subscribe (dataX => {this.barChartData.labels = dataX});
  //     this.barChartData = {...this.barChartData}

  //     this.dataYSubscription = dataFromService.dataY$.subscribe (dataY => {this.barChartData.datasets[0].data = dataY});
  //     this.barChartData = {...this.barChartData}
  //   }

  //   ngOnDestroy():void {
  //     if(this.dataXSubscription) {
  //       this.dataXSubscription.unsubscribe
  //     }
  //     if( this.dataYSubscription) {
  //       this.dataYSubscription.unsubscribe
  //     }
  //   }
  private dataXSubscription ?: Subscription;
  private dataYSubscription ?: Subscription;

  constructor(private DataService : TransmitDataService, private dataX : TransmitDataService, private dataY : TransmitDataService) {}
  // private arrData :string[] = []

  ngOnInit (){
    this.dataXSubscription = this.dataX.dataObject$.subscribe
    (data => {for (let item of data) {
      // console.log(item.data);
      // this.arrData.push (item.data);
      this.barChartData.labels?.push(item.data)
      }
    // console.log(this.arrData);
    }
      );
      console.log(this.dataXSubscription);


      this.dataYSubscription = this.dataY.dataObject$.subscribe
      (data => {for (let item of data) {
        // console.log(item.tips);
        // console.log("График получил данные ", item.tips.split (' ')[0])
        this.barChartData.datasets[0].data.push( Number(item.tips.split (' ')[0]))
      }})

        console.log("График получил данные ", this.barChartData.datasets[0].data)
        console.log("График получил данные ", this.barChartData.labels);

    }

    ;



}
