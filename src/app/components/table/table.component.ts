import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransmitDataService } from '../../services/transmit-data.service';
import { SharedModule } from '../../shared.module';
import {
  ButtonClass,
  ButtonData,
  DataUserOperation,
} from '../../types/sectionItem';
import { UserFormsComponent } from '../user-forms/user-forms.component';

@Component({
  selector: 'table',
  imports: [SharedModule, CommonModule, UserFormsComponent],
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
  };

  public btnTextInput: ButtonData = {
    text: 'Ok',
  };
  public classFromTableComponent: ButtonClass = {
    background: '#F7F9FB',
    color: '#101112',
  };
  private dataSubscription!: Subscription;
  public dataUserOperations: DataUserOperation[] = [];

  constructor(
    private myServiceTips: TransmitDataService,
    private transmitData: TransmitDataService
  ) {}

  // get class on tab.start
  private numberActiveTab: number = 3;
  clickOnTab(index: number) {
    this.numberActiveTab = index;
    this.myServiceTips.getDataUserTab(this.numberActiveTab);
    if (this.numberActiveTab === 5) {
      this.btnTextInput = {
        text: 'Ok',
        disabled: false,
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
