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
import { Observable, tap } from 'rxjs';
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

  // public operations: DataUserOperation[] = [];

  public keys: string[] = [];
  // меняем enum to obj чтобы корректно отображать порядок
  public tabs: { key: string; value: string }[] =
    this.convertEnumToArray(TabsName);
  public filters: { key: string; value: string }[] =
    this.convertEnumToArray(TitleFilter);
  private IDActiveTab: string = 'forMonth';
  setUserFilter: string = TitleFilter.date;

  ngOnInit(): void {
    this.getSortedData$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe;
  }

  convertEnumToArray(myEnum: any): { key: string; value: string }[] {
    return Object.keys(myEnum).map((key) => ({
      key: key,
      value: myEnum[key as keyof typeof myEnum],
    }));
  }

  titleFilterSort(setUserFilter: string) {
    this.setUserFilter = setUserFilter;
  }

  getSortedData$(): Observable<DataUserOperation[]> {
    return this.#filterService.dataOperationFromService$.pipe(
      tap((data) => {
        if (data && data.length > 0) {
          // Обновляем ключи, когда получаем данные
          this.keys = Object.keys(data[0]);
        }
      })
    );
  }

  // get class on tab.start

  clickOnTab(name: string) {
    this.IDActiveTab = name;
    this.#myServiceGetData.getDataUserTab(this.IDActiveTab);
    this.#inputService.handleClickOnPerioidTab(this.IDActiveTab);
    this.#cdr.markForCheck();
  }

  classActiveTab(name: string): string {
    if (name == this.IDActiveTab) {
      return 'isActive';
    } else {
      return 'isUnactive';
    }
  }
  // get class on tab.end
}
