import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { ChartComponent } from '../chart/chart.component';
import { SharedModule } from '../../shared.module';
import { ButtonData } from '../../types/sectionItem';

@Component({
  selector: 'main',
  standalone: true,
  imports: [TableComponent,SharedModule, ChartComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent {
  public btnText: ButtonData = { text: 'Создать QR-Code', iconClass : 'icon-add-outline'}
}
