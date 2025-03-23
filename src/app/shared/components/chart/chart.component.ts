import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChartConfiguration, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataUserOperation } from '../../../types/sectionItem';
import { SortDataService } from '../filter/service/filter.component.service';

@Component({
  selector: 'chart',
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  readonly #filterService = inject(SortDataService);
  readonly #destroyRef = inject(DestroyRef);

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

  ngOnInit() {
    this.#filterService.dataOperationFromService$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((dataFromService: DataUserOperation[]) => {
        if (dataFromService.length === 0) return;
        const getDateFromService = dataFromService.map((item) => item.data);
        // У чаевых удаляем симввол валюты в значении
        const getTipsFromService = dataFromService.map((item) =>
          Number(item.tips.split(' ')[0])
        );
        if (dataFromService) {
          // Создаем новый график с новыми данными и обновляемся
          const newBarChartData = structuredClone(this.barChartData);
          newBarChartData.labels = getDateFromService;
          newBarChartData.datasets[0].data = getTipsFromService;
          this.barChartData = newBarChartData;
          if (this.chart?.chart) {
            this.chart.chart.data = this.barChartData;
            this.chart.update();
          }
        }
      });
  }
}
