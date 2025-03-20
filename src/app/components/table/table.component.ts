import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TransmitDataService } from '../../services/transmit-data.service';
import { TabsName } from '../../types/enums/tabsName';
import { ButtonData, DataUserOperation } from '../../types/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { DataInputComponent } from '../data-input/data-input.component';
import { switchOnService } from '../data-input/services/switchOnInput';
import { FilterComponent } from '../filter/filter.component';
import { SortDataService } from '../filter/service/filter.component.service';
import { TitleFilter } from '../filter/types/enum/nameFilter';

@Component({
  selector: 'table',
  imports: [
    CommonModule,
    DataInputComponent,
    FilterComponent,
    ButtonsComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly #myServiceGetData = inject(TransmitDataService);
  readonly #inputService = inject(switchOnService);
  readonly #filterService = inject(SortDataService);
  readonly #cdr = inject(ChangeDetectorRef);
  // readonly #destroyRef = inject(DestroyRef);

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
}
