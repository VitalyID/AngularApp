import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TransmitDataService } from '../../services/transmit-data.service';
import { SharedModule } from '../../shared.module';
import { TitleFilter } from '../../types/enums/nameFilter';
import { Tabs } from '../../types/interfaces/Tabs';
import { ButtonData, DataUserOperation } from '../../types/sectionItem';
import { DataInputComponent } from '../data-input/data-input.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'table',
  imports: [SharedModule, CommonModule, DataInputComponent, FilterComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  readonly #myService = inject(TransmitDataService);
  readonly #myServiceGetData = inject(TransmitDataService);

  public tabs: Tabs[] = [
    { name: 'За сегодня', id: 0 },
    { name: 'За вчера', id: 1 },
    { name: 'За неделю', id: 2 },
    { name: 'За месяц', id: 3 },
    { name: 'За прошлый месяц', id: 4 },
    { name: 'За период', id: 5 },
  ];

  public btnText: ButtonData = {
    text: 'Скачать в Exel',
    iconClass: 'icon-PaperDownload',
    background: '#F7F9FB',
    color: '#101112',
    id: 1,
  };

  transmitToBTN: ButtonData = {
    text: 'Ok',
    disabled: true,
    id: 2,
  };

  public operations: DataUserOperation[] = [];
  public keys: string[] = [];

  constructor() {}

  // get class on tab.start
  private IDActiveTab: number = 3;
  clickOnTab(index: number) {
    this.IDActiveTab = index;
    this.#myService.getDataUserTab(this.IDActiveTab);

    if (this.IDActiveTab === 5) {
      this.transmitToBTN = {
        text: 'Ok',
        disabled: false,
        id: 2,
      };
    } else {
      this.transmitToBTN = {
        text: 'Ok',
        disabled: true,
        id: 2,
      };
    }
  }

  classActiveTab(index: number): string {
    if (index == this.IDActiveTab) {
      return 'isActive';
    } else {
      return 'isUnactive';
    }
  }
  // get class on tab.end

  // private filters: string[] = []
  public filters: string[] = Object.values(TitleFilter);
  ngOnInit(): void {
    this.keys = ['data', 'country', 'tips', 'commission', 'email', 'card'];
    this.#myServiceGetData.dataObject$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.operations = data;
      });
  }
}
