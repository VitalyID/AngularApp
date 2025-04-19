import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { TransmitDataService } from '../../../services/transmit-data.service';
import { TabsName } from '../../../types/enums/tabsName';
import { ButtonData, DataUserOperation } from '../../../types/sectionItem';
import { BordeerLineComponent } from '../bordeer-line/border-line.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { ButtonService } from '../buttons/service/buttons.component.service';
import { DataInputComponent } from '../data-input/data-input.component';
import { switchOnService } from '../data-input/services/switchOnInput';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ListDropdown } from '../dropdown/types/interface/listDropdown';
import { FilterComponent } from '../filter/filter.component';
import { SortDataService } from '../filter/service/filter.component.service';
import { TitleFilter } from '../filter/types/enum/nameFilter';
import { MobileTransactionCardComponent } from '../mobile-transaction-card/mobile-transaction-card.component';

@Component({
  selector: 'table',
  imports: [
    CommonModule,
    DataInputComponent,
    FilterComponent,
    ButtonsComponent,
    DropdownComponent,
    BordeerLineComponent,
    MobileTransactionCardComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  readonly #myServiceGetData = inject(TransmitDataService);
  readonly #inputService = inject(switchOnService);
  readonly #filterService = inject(SortDataService);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #DestroyRef = inject(DestroyRef);

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

  calendar: ButtonData = {
    iconClass: 'icon-Calendar',
    disabled: true,
    background: '#F7F9FB',
    id: 20,
    borderStyle: '1px solid #C8C9CF',
  };

  filterMobile: ListDropdown[] = [];
  defaultValue: ListDropdown = {
    id: '1',
    item: 'Необходимо выбрать',
  };

  public keys: string[] = [];
  // меняем enum to obj чтобы корректно отображать порядок
  public tabs: { key: string; value: string }[] =
    this.convertEnumToArray(TabsName);
  public filters: { key: string; value: string }[] =
    this.convertEnumToArray(TitleFilter);
  private IDActiveTab: string = 'forMonth';
  userFilter: string[] = [TitleFilter.date, 'Up'];
  operations: DataUserOperation[] = [];

  tableTotal$: Observable<string[]> = this.#filterService.totalFromService$;
  tableBody$: Observable<DataUserOperation[]> =
    this.#filterService.dataOperationFromService$;
  readonly #buttonService = inject(ButtonService);

  visibility: boolean = false;

  ngOnInit(): void {
    const arrFilter = Object.values(TabsName);

    this.filterMobile = arrFilter.map((el) => {
      const arrEl: ListDropdown = { item: el, id: uuidv4() };
      return arrEl;
    });

    this.#buttonService.eventClick$
      .pipe(takeUntilDestroyed(this.#DestroyRef))
      .subscribe((data) => {
        console.log(data);
        if (data.id === 20) {
          this.visibility = true;
        }
      });
  }

  convertEnumToArray(myEnum: any): { key: string; value: string }[] {
    return Object.keys(myEnum).map((key) => ({
      key: key,
      value: myEnum[key as keyof typeof myEnum],
    }));
  }

  setUserFilter(userFilter: string[]) {
    this.userFilter = userFilter;
  }

  clickOnTab(name: string) {
    this.IDActiveTab = name;

    this.#myServiceGetData.getDataUserTab(this.IDActiveTab);
    this.#inputService.handleClickOnPerioidTab(this.IDActiveTab);
    this.#cdr.markForCheck();
  }

  classActiveTab(name: string): string {
    return name == this.IDActiveTab ? 'isActive' : 'isUnactive';
  }

  getKeys(item: DataUserOperation[] | null) {
    if (!item || item.length === 0) return;

    return Object.keys(item[0]);
  }

  itemSelected(data: ListDropdown) {
    console.log(data);

    const arrTabsKey: (keyof typeof TabsName)[] = Object.keys(
      TabsName
    ) as (keyof typeof TabsName)[];

    arrTabsKey.forEach((item) => {
      if (TabsName[item] === data.item) {
        this.clickOnTab(item);
      }
    });

    if (data.item === TabsName.forPeriod) {
      this.calendar.disabled = false;
    } else {
      this.calendar.disabled = true;
      this.visibility = false;
    }
  }
}
