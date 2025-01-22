import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ChartConfiguration, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { TransmitDataService } from '../../services/transmit-data.service';

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
    datasets: [{ data: [] }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      colors: {
        forceOverride: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 14,
            family: 'Formular',
            weight: 600,
          },
        },
      },
      y: {
        ticks: {
          color: '#101112',
          font: {
            size: 14,
            family: 'Formular',
          },
          maxTicksLimit: 10,
          stepSize: 2000,
        },
      },
    },
  };

  private dataXSubscription?: Subscription;
  private dataYSubscription?: Subscription;

  constructor(
    private DataService: TransmitDataService,
    private dataX: TransmitDataService,
    // private dataY: TransmitDataService,
    private cdr: ChangeDetectorRef
  ) {}
  // private dataFromService : [{}] = [{}]

  ngOnInit() {
    let dataFromService: any[];
    this.dataXSubscription = this.dataX.dataObject$.subscribe(
      (dataFromService) => {
        const getDateFromService = dataFromService.map((item) => item.data);

        // У чаевых удаляем симввол валюты в значении
        const getTipsFromService = dataFromService.map((item) =>
          Number(item.tips.split(' ')[0])
        );

        if (dataFromService) {
          console.log(
            'Массив дат, которые пришли с сервиса ',
            getDateFromService
          );
          this.barChartData.labels = getDateFromService;
          this.barChartData.datasets[0].data = getTipsFromService;
          // console.log(this.barChartData.datasets[0].data);

          // Применение новых данных не изменило график, делаем дубли всех данных из-за onPush
          const doubleBarChartData = { ...this.barChartData };
          const newLabels = [...getDateFromService];
          doubleBarChartData.labels = newLabels;

          // для второй оси
          const newDataset = [...getTipsFromService];
          doubleBarChartData.datasets[0].data = newDataset;
          this.barChartData = doubleBarChartData;

          // Этот код тоже работает
          // ----------------------
          // this.barChartData = {
          //   ...this.barChartData,
          //   labels: [...getDateFromService],
          // };

          this.cdr.detectChanges();
          console.log('Даты: ', this.barChartData.labels);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.dataXSubscription && this.dataYSubscription) {
      this.dataXSubscription.unsubscribe;
      // this.dataYSubscription.unsubscribe;
    }
  }
}
