import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  readonly #buttonService = inject(ButtonService);

  @Input() dateForBTN!: ButtonData;
  btnText2!: ButtonData;

  myInputForm = new FormGroup({
    dateFrom: new FormControl('2024-03-06'),
    dateEnd: new FormControl('2025-01-24'),
  });

  ngOnInit(): void {
    this.btnText2 = this.dateForBTN;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateForBTN']) {
      this.btnText2 = this.dateForBTN;
    }
    if (changes['clickSubscription']) console.log(222222);
  }

  constructor() {
    // принимаем клик с сервиса btn
    this.#buttonService.eventClick$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (data.id === 2) {
          console.log('Кнопка нажата с ID:', data.id);

          this.#buttonService.transmitData(this.myInputForm.value);
        }
      });
  }
}
