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

  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);
  readonly #stepService = inject(StepService);
  // debug: readonly #store = inject(Store);
  // debug: readonly #popupService = inject(PopupService);

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

  // debug: lastStep() {
  // debug:   // debug: this.#stepService.changeStep$.next(1);
  // debug: }

  // debug: nextStep() {
  // debug:   this.formatAndSetCard(this.cardForm.getRawValue());

  // debug:   this.#store.dispatch(new UpdateUser(this.card));
  // debug:   this.#popupService.popupState$.next({
  // debug:     state: false,
  // debug:     component: null,
  // debug:   });
  // debug: }

  generalSubscriptionFields() {
    this.cardForm.valueChanges
      .pipe(takeUntilDestroyed(this.#destroyRef), debounceTime(300))
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
