import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { PopupService } from '../../../services/popup.service';
import { UpdateUser } from '../../../state/user/user.action';

import { UserCard } from '../../../state/user/user.models';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { StepService } from '../stepper/service/step.service';
import { InputTextComponent } from './../input-text/input-text.component';

@Component({
  selector: 'registration-card',
  imports: [InputTextComponent, ReactiveFormsModule, ButtonsComponent],
  templateUrl: './registration-card.component.html',
  styleUrl: './registration-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationCardComponent implements OnInit {
  card: UserCard = {
    card: { card_number: '', expiry: '', cvc: '' },
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
    this.cardForm
      .get('card')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((userCard) => {
        if (userCard) {
          const newCard = userCard.replace(/ /g, '');
          this.card.card = { ...this.card.card, card_number: newCard };
        }
      });

    this.cardForm
      .get('data')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data) {
          this.card.card = { ...this.card.card, expiry: data };
        }
      });

    this.cardForm
      .get('cvc')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((cvc) => {
        if (cvc) {
          this.card.card = { ...this.card.card, cvc: cvc };
        }
      });
  }

  lastStep() {
    this.#stepService.changeStep$.next(1);
  }

  nextStep() {
    this.#store.dispatch(new UpdateUser(this.card));
    this.#popupService.popupState$.next({
      id: 'SetUser',
      state: false,
      component: null,
    });
  }
}
