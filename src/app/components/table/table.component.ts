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
// import { Tabs } from '../../types/interfaces/Tabs';
import { TabsName } from '../../types/enums/tabsName';
import { ButtonData, DataUserOperation } from '../../types/sectionItem';
import { DataInputComponent } from '../data-input/data-input.component';
import { switchOnService } from '../data-input/services/switchOnInput';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'table',
  imports: [SharedModule, CommonModule, DataInputComponent, FilterComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  readonly #myServiceGetData = inject(TransmitDataService);
  readonly #inputService = inject(switchOnService);

  public tabs = TabsName;

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

  // меняем enum to obj чтобы корректно отображать порядок tabs
  public tabsArray: { key: string; value: string }[] =
    this.convertEnumToArray(TabsName);

  convertEnumToArray(myEnum: any): { key: string; value: string }[] {
    return Object.keys(myEnum).map((key) => ({
      key: key,
      value: myEnum[key as keyof typeof myEnum],
    }));
  }

  constructor() {
    this.#myServiceGetData.dataObject$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.operations = data;
      });
  }

  // get class on tab.start
  private IDActiveTab: string = 'forMonth';
  clickOnTab(name: string) {
    this.IDActiveTab = name;
    this.#myServiceGetData.getDataUserTab(this.IDActiveTab);
    this.#inputService.handleClickOnPerioidTab(this.IDActiveTab);
  }

  classActiveTab(name: string): string {
    if (name == this.IDActiveTab) {
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
    // this.#myServiceGetData.getDataUserTab(this.tabs.id)
  }
}
