import { BankCard } from './../../../state/user/user.models';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { PopupService } from '../../../services/popup.service';
import { UpdateUser } from '../../../state/user/user.action';

import { debounceTime } from 'rxjs';
import { UserCard } from '../../../state/user/user.models';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { StepService } from '../stepper/service/step.service';
import { InputTextComponent } from './../input-text/input-text.component';
import { CardFormValue } from './types/interfaces/CardFormValue';

@Component({
  selector: 'registration-card',
  imports: [InputTextComponent, ReactiveFormsModule, ButtonsComponent],
  templateUrl: './registration-card.component.html',
  styleUrl: './registration-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationCardComponent implements OnInit {
  @Input() isTitle?: boolean = true;
  @Input() isButtons?: boolean = true;
  @Output() cardDataChange = new EventEmitter<BankCard[]>();

  card: UserCard = {
    cards: [{ card_number: '', expiry: '', cvc: '', isActive: true }],
    currentComponent: RegistrationCardComponent,
  };

  buttonLast: ButtonConfig = {
    text: 'Назад',
    borderStyle: 'none',
  };

  buttonNext: ButtonConfig = {
    text: 'Далее',
    borderStyle: 'none',
  };

  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);
  readonly #stepService = inject(StepService);
  readonly #store = inject(Store);
  readonly #popupService = inject(PopupService);

  cardForm = this.#fb.group({
    card: [
      '',
      [Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)],
    ],
    data: ['', [Validators.required, Validators.minLength(4)]],
    cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
  });

  ngOnInit(): void {
    if (!this.isButtons) this.generalSubscriptionFields();
  }

  lastStep() {
    this.#stepService.changeStep$.next(1);
  }

  nextStep() {
    this.generalGetFields(this.cardForm.getRawValue());

    this.#store.dispatch(new UpdateUser(this.card));
    this.#popupService.popupState$.next({
      id: 'SetUser',
      state: false,
      component: null,
    });
  }

  generalSubscriptionFields() {
    this.cardForm.valueChanges
      .pipe(takeUntilDestroyed(this.#destroyRef), debounceTime(300))
      .subscribe((value) => {
        this.card.cards = [
          {
            card_number: value.card ? value.card.replace(/\s/g, '') : '',
            expiry: value.data || '',
            cvc: value.cvc || '',
            isActive: true,
          },
        ];

        this.cardDataChange.emit(this.card.cards);
      });
  }

  generalGetFields(formValue: CardFormValue) {
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
