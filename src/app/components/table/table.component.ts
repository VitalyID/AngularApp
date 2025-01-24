import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TransmitDataService } from '../../services/transmit-data.service';
import { SharedModule } from '../../shared.module';
import { ButtonData, DataUserOperation } from '../../types/sectionItem';
import { DataInputComponent } from '../data-input/data-input.component';

@Component({
  selector: 'table',
  imports: [SharedModule, CommonModule, DataInputComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  public tab: string[] = [
    'За сегодня',
    'За вчера',
    'За неделю',
    'За месяц',
    'За прошлый месяц',
    'За период',
  ];

  public btnText: ButtonData = {
    text: 'Скачать в Exel',
    iconClass: 'icon-PaperDownload',
    background: '#F7F9FB',
    color: '#101112',
  };
  // public classFromTableComponent: ButtonClass= {background : '#F7F9FB', color: '#101112'};

  transmitToBTN: ButtonData = {
    text: 'Ok',
    disabled: true,
  };

  private dataSubscription!: Subscription;
  public dataUserOperations: DataUserOperation[] = [];

  constructor(
    private myServiceTips: TransmitDataService,
    private transmitData: TransmitDataService,
    private cdr: ChangeDetectorRef
  ) {}

  // get class on tab.start
  private numberActiveTab: number = 3;
  clickOnTab(index: number) {
    this.numberActiveTab = index;
    this.myServiceTips.getDataUserTab(this.numberActiveTab);

    if (this.numberActiveTab === 5) {
      this.transmitToBTN = {
        text: 'Ok',
        disabled: false,
      };
      // this.cdr.markForCheck();
    } else {
      this.transmitToBTN = {
        text: 'Ok',
        disabled: true,
      };
    }
  }

  getClass(index: number): string {
    if (index == this.numberActiveTab) {
      return 'isActive';
    } else {
      return 'isUnactive';
    }
  }
  // get class on tab.end

  ngOnInit(): void {
    this.dataSubscription = this.transmitData.dataObject$.subscribe((data) => {
      this.dataUserOperations = data;
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe;
    }
  }
}
