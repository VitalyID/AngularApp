import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
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
export class DataInputComponent implements OnChanges, OnInit, OnDestroy {
  readonly #buttonService = inject(ButtonService);

  @Input() dateForBTN!: ButtonData;
  btnText2!: ButtonData;

  myInputForm = new FormGroup({
    dateFrom: new FormControl('2024-03-06'),
    dateEnd: new FormControl('2025-01-24'),
  });

  #clickSubscription!: Subscription;

  ngOnInit(): void {
    this.btnText2 = this.dateForBTN;

    // принимаем клик с сервиса btn
    this.#clickSubscription = this.#buttonService.eventClick$.subscribe(
      (data) => {
        if (data.id === 2) {
          console.log('Кнопка нажата с ID:', data.id);

          this.#buttonService.transmitData(this.myInputForm.value);
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateForBTN']) {
      this.btnText2 = this.dateForBTN;
    }
    if (changes['clickSubscription']) console.log(222222);
  }

  ngOnDestroy(): void {
    if (this.#clickSubscription) {
      this.#clickSubscription.unsubscribe;
    }
  }

  constructor() {}
}
