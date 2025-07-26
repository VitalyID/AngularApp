import { InputTextComponent } from './../input-text/input-text.component';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonsComponent } from '../buttons/buttons.component';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { StepService } from '../stepper/service/step.service';

@Component({
  selector: 'registration-card',
  imports: [InputTextComponent, ReactiveFormsModule, ButtonsComponent],
  templateUrl: './registration-card.component.html',
  styleUrl: './registration-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationCardComponent implements OnInit {
  card = signal({ card_number: '', expiry: '', cvc: '' });
  button: ButtonConfig = {
    text: 'Назад',
    borderStyle: 'none',
  };

  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);
  readonly #stepService = inject(StepService);

  cardForm = this.#fb.group({
    card: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    data: ['', [Validators.required, Validators.minLength(4)]],
    cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
  });

  ngOnInit(): void {
    this.cardForm
      .get('card')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((card) => {
        if (card) {
          this.card.update((oldValue) => ({ ...oldValue, card_number: card }));
        }
      });

    this.cardForm
      .get('data')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data) {
          this.card.update((oldValue) => ({ ...oldValue, expiry: data }));
        }
      });

    this.cardForm
      .get('cvc')
      ?.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((cvc) => {
        if (cvc) {
          this.card.update((oldValue) => ({ ...oldValue, cvc: cvc }));
        }
      });
  }

  lastStep() {
    this.#stepService.changeStep$.next(1);
  }
}
