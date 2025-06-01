import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
  Signal,
} from '@angular/core';
// import { EventEmitter } from 'stream';
import * as uuid from 'uuid';
import { ButtonsComponent } from '../buttons/buttons.component';
import { UserCardState } from './../../../state/cards.state';
import { ButtonData } from './../../../types/sectionItem';

@Component({
  selector: 'pagination',
  imports: [ButtonsComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input({ required: true }) state: Signal<UserCardState> = signal({
    cards: [],
    userCard: {
      background_hex_color: '#E7E9F0',
      business_payment_type: 'TIPS',
      button_hex_color: '#3FA949',
      commission_coverage: false,
      employee_display: true,
      id: 0,
      logo_file_id: '../../assets/images/logoDefault.png',
      preset_payment_sizes: [100, 250, 500],
      qr_image: '',
      rating: false,
      reviews: false,
      smiles: false,
    },
    pagination: { limit: 1, total: 1, offset: 1 },
  });
  @Output() userClick = new EventEmitter<string>();

  previousBtn: ButtonData = {
    text: 'Назад',
    background: '#3bc76b',
    id: uuid.v4(),
  };

  nextBtn: ButtonData = {
    text: 'Вперед',
    background: '#3bc76b',
    id: uuid.v4(),
  };

  back = signal<boolean>(false);
  next = signal<boolean>(false);

  // offset is need for change number-text in button page
  offset = signal<number>(0);

  buttons: ButtonData[] = [];

  buttonText = signal<number[]>([]);

  paginationButton = computed(() => {
    this.buttons = [];
    for (
      let button = this.buttonText()[0];
      button <= this.buttonText()[2];
      button++
    ) {
      this.buttons.push({
        text: button.toString(),
        id: uuid.v4(),
      });
    }
    return this.buttons;
  });

  ChangeByEffect = effect(() => {
    // switch onn button NEXT
    if (
      Math.ceil(this.state().pagination.total / this.state().pagination.limit) >
      3
    ) {
      this.next.set(true);
    }
    // =============================================

    // fill in the array with button
    this.buttonText.set(
      this.fillInByNumber(this.offset() + 1, this.offset() + 3)
    );
    // ============================================

    // switch off button "NEXT" when cards finished
    if (
      this.buttonText()[this.buttonText().length - 1] *
        this.state().pagination.limit >=
      this.state().pagination.total
    ) {
      this.next.set(false);
    }
    // ==============================================

    // if the first button equal '1', the button BACK is off
    if (this.buttonText()[0] === 1) {
      this.back.set(false);
    }
  });

  fillInByNumber(start: number, end: number): number[] {
    const arrNumber: number[] = [];
    for (let item = start; item <= end; item++) {
      arrNumber.push(item);
    }
    return arrNumber;
  }

  onClick(pageNum: string) {
    this.userClick.emit(pageNum);
  }

  clickNext() {
    this.offset.update((value) => value + 1);
    this.back.update((value) => (value = true));
  }

  clickBack() {
    this.offset.update((value) => value - 1);
  }
}
