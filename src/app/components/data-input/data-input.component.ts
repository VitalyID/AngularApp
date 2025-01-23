import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ButtonData } from './../../types/sectionItem';

@Component({
  selector: 'data-input',
  imports: [SharedModule],
  templateUrl: './data-input.component.html',
  styleUrl: './data-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataInputComponent implements OnChanges {
  @Input() dateForBTN: ButtonData | null = null;
  btnText2: ButtonData | null = null;

  ngOnInit(): void {
    this.btnText2 = this.dateForBTN;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateForBTN']) {
      console.log('Пришли изменения ', this.dateForBTN);
      // this.cdr.detectChanges();
      // this.cdr.markForCheck();
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
