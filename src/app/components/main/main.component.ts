import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
// import { ButtonsComponent } from '../buttons/buttons.component';
import { SharedModule } from '../../shared.module';
import { ButtonData } from '../../types/sectionItem';

@Component({
  selector: 'main',
  standalone: true,
  imports: [TableComponent,SharedModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent {
  public btnText: ButtonData = { text: 'Создать QR-Code', iconClass : 'icon-add-outline'}
}
