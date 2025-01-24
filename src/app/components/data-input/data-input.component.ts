import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../shared.module';
import { ButtonData } from './../../types/sectionItem';
import { ButtonService } from './../buttons/service/buttons.component.service';

@Component({
  selector: 'data-input',
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './data-input.component.html',
  styleUrl: './data-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataInputComponent implements OnChanges, OnInit {
  @Input() dateForBTN!: ButtonData;
  btnText2!: ButtonData;

  myInputForm = new FormGroup({
    dateFrom: new FormControl('2024-03-06'),
    dateEnd: new FormControl('2025-01-24'),
  });

  // #dateTimeUserOperations: DateTimeUserOperations = {
  //   dateFrom: '',
  //   dateEnd: '',
  // };

  #clickSubscription!: Subscription;

  ngOnInit(): void {
    this.btnText2 = this.dateForBTN;

    // принимаем клик с сервиса btn
    this.#clickSubscription = this.buttonService.eventClick$.subscribe(
      (data) => {
        if (data.id === 2) {
          console.log('Кнопка нажата с ID:', data.id);

          // проверка на соответсвие
          // const tmp = this.myInputForm.value as DateTimeUserOperations;
          this.buttonService.transmitData(this.myInputForm.value);
          // this.#dateTimeUserOperations = tmp;

          // if (
          //   this.#dateTimeUserOperations.dateFrom &&
          //   this.#dateTimeUserOperations.dateEnd
          // ) {
          //   // проверка на соответсвие.end

          //   console.log(
          //     this.#dateTimeUserOperations.dateFrom,
          //     ' ',
          //     this.#dateTimeUserOperations.dateEnd
          //   );

          //   const dateStart = new Date(this.#dateTimeUserOperations.dateFrom);
          //   const dateEnd = new Date(this.#dateTimeUserOperations.dateEnd);
          //   // console.log(typeof dateEnd);

          //   console.log(+dateEnd - +dateStart);
          // }
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateForBTN']) {
      console.log('Пришли изменения ', this.dateForBTN);
      this.btnText2 = this.dateForBTN;
    }
    if (changes['clickSubscription']) console.log(222222);
  }

  ngOnDestroy(): void {
    if (this.#clickSubscription) {
      this.#clickSubscription.unsubscribe;
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private buttonService: ButtonService
  ) {}
}
