import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonData } from '../../types/sectionItem';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'table',
  imports: [SharedModule,CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  public tab : string[] = ['За сегодня','За вчера','За неделю','За месяц','За прошлый месяц','За период']
public btnText: ButtonData = {text: 'Скачать в Exel'}
}
