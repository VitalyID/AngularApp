import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankCard } from './../../../state/user/user.models';
import { debounceTime, filter, map } from 'rxjs';
import { UserCard } from '../../../state/user/user.models';
import { StepService } from '../stepper/service/step.service';
import { InputTextComponent } from './../input-text/input-text.component';
import { CardFormValue } from './types/interfaces/CardFormValue';

@Component({
  selector: 'registration-card',
  imports: [InputTextComponent, ReactiveFormsModule],
  templateUrl: './registration-card.component.html',
  styleUrl: './registration-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationCardComponent implements OnInit {
  @Output() cardDataChange = new EventEmitter<BankCard[]>();

  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);
  readonly #stepService = inject(StepService);

  card: UserCard = {
    cards: [{ card_number: '', expiry: '', cvc: '', isActive: true }],
  };
  isFormInValid: boolean = true;

  cardForm = this.#fb.group({
    card: [
      '',
      [Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)],
    ],
    data: [
      '',
      [
        Validators.required,
        // eslint-disable-next-line no-useless-escape
        Validators.pattern('^(0[1-9]|1[0-2])\/\\d{2}$'),
      ],
    ],
    cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
  });

  ngOnInit(): void {
    this.generalSubscriptionFields();
    this.cardForm.statusChanges
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.isFormInValid = !this.cardForm.valid;
        this.#stepService.isFormInValid$.next(this.isFormInValid);
      });
  }

  generalSubscriptionFields() {
    this.cardForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter(() => this.cardForm.valid),
        map(() => this.cardForm.value),
        debounceTime(300),
      )
      .subscribe((value) => {
        this.formatAndSetCard(value as CardFormValue);
        this.cardDataChange.emit(this.card.cards);
        this.#stepService.emitStepData$.next(this.card);
      });
  }

  formatAndSetCard(formValue: CardFormValue) {
    const card_number = formValue.card ? formValue.card.replace(/\s/g, '') : '';
    const expiry = formValue.data || '';
    const cvc = formValue.cvc || '';
    if (card_number && expiry && cvc) {
      this.card.cards = [
        {
          card_number: card_number,
          expiry: expiry,
          cvc: cvc,
          isActive: true,
        },
      ];
    }
  }
}
