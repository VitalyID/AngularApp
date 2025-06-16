import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { ScreenSizeService } from '../../../services/screen-size.service';
import { TransmitDataService } from '../../../services/transmit-data.service';
import { TabsName } from '../../../types/enums/tabsName';
import { Breakpoints } from '../../../types/interfaces/breakpoints';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { DataUserOperation } from '../../../types/interfaces/userOperation';
import { BordeerLineComponent } from '../bordeer-line/border-line.component';
import { ButtonsComponent } from '../buttons/buttons.component';
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
  standalone: true,
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
  readonly #ViewPort = inject(ScreenSizeService);

  public btnText: ButtonConfig = {
    text: 'Скачать в Exel',
    iconClass: 'icon-PaperDownload',
    background: '#F7F9FB',
    color: '#101112',
  };

  transmitToBTN: ButtonConfig = {
    text: 'Ok',
    disabled: true,
  };

  calendar: ButtonConfig = {
    iconClass: 'icon-Calendar',
    disabled: false,
    background: '#F7F9FB',

    borderStyle: '1px solid #C8C9CF',
  };

  filterMobile: ListDropdown[] = [];
  defaultValue: ListDropdown = {
    id: uuid.v4(),
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
  windowSize$: Observable<Breakpoints> = this.#ViewPort.isMobileSubject$;

  visibility = signal<boolean>(false);

  ngOnInit(): void {
    console.log(this.visibility());

    const arrFilter = Object.values(TabsName);

    this.filterMobile = arrFilter.map((el) => {
      const arrEl: ListDropdown = { item: el, id: uuidv4() };
      return arrEl;
    });
  }

  onClickDownload() {
    // на текущий момент функционал не реализован
  }

  OnClickCalendar() {
    console.log('111');

    this.visibility.update((current) => !current);
    console.log(this.visibility());
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
    // console.log(name);

    this.#myServiceGetData.getDataUserTab(this.IDActiveTab);
    this.#inputService.handleClickOnPerioidTab(this.IDActiveTab);

    this.defaultValue = {
      ...this.defaultValue,
      item: TabsName[this.IDActiveTab as keyof typeof TabsName],
    };
    this.#cdr.markForCheck();
  }

  classActiveTab(name: string): string {
    return name == this.IDActiveTab ? 'isActive' : 'isUnactive';
  }

  getKeys(item: DataUserOperation[] | null) {
    if (!item || item.length === 0) return;
    return Object.keys(item[0]).filter((e) => {
      return e !== 'id';
    });
  }

  itemSelected(data: ListDropdown) {
    // console.log(data);

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
      this.visibility.set(false);
    }
  }
}
