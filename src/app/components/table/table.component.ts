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
import { TransmitDataService } from '../../services/transmit-data.service';
import { SharedModule } from '../../shared.module';
import { TabsName } from '../../types/enums/tabsName';
import { ButtonData, DataUserOperation } from '../../types/sectionItem';
import { DataInputComponent } from '../data-input/data-input.component';
import { switchOnService } from '../data-input/services/switchOnInput';
import { FilterComponent } from '../filter/filter.component';
import { SortDataService } from '../filter/service/filter.component.service';
import { TitleFilter } from '../filter/types/enum/nameFilter';

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
  readonly #filterService = inject(SortDataService);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #destroyRef = inject(DestroyRef);

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
  key: string[] = [];
  bill: number = 0;
  count: number = 0;
  amountLocalRU: string = '';
  commissionLocaleRU: string = '';
  billLocaleRU: string = '';

  convertEnumToArray(myEnum: any): { key: string; value: string }[] {
    return Object.keys(myEnum).map((key) => ({
      key: key,
      value: myEnum[key as keyof typeof myEnum],
    }));
  }

  setUserFilter(userFilter: string[]) {
    this.userFilter = userFilter;
  }

  ngOnInit(): void {
    this.#filterService.dataOperationFromService$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.operations = data;
        this.#cdr.markForCheck();

        let amount = 0;
        let commission = 0;
        let bill = 0;

        // counting total
        if (data && data.length > 0) {
          this.keys = Object.keys(data[0]);
          this.count = 0;

          data.forEach((item) => {
            amount += Number(item.tips.split(' ')[0]);
            commission += Number(item.commission.split(' ')[0]);
            this.count++;
          });
        } else {
          this.keys = [];
        }

        bill = amount / this.count;
        this.amountLocalRU = this.#formatCurrent(amount);
        this.commissionLocaleRU = this.#formatCurrent(commission);
        this.billLocaleRU = this.#formatCurrent(bill);
      });
  }

  // get class on tab.start

  #formatCurrent(data: number): string {
    return new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'RUB',
    }).format(data);
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
}
