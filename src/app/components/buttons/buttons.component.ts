import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonData } from './../../types/sectionItem';
import { ListenerService } from './service/buttonListenerStatus.compoent.service';
import { ButtonService } from './service/buttons.component.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent implements OnInit {
  @Input() buttonData?: ButtonData;

  readonly #listenerService = inject(ListenerService);
  readonly #service = inject(ButtonService);
  readonly #destroyRef: DestroyRef = inject(DestroyRef);

  // id необходим для проверки, чтобы снимать disabled с кнопки формы
  public id: number = 2;

  ngOnInit(): void {
    this.#listenerService.aboutBTN$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (this.buttonData && data.data.id === this.id) {
          this.buttonData.disabled = data.data.disabled;
          // console.log(this.buttonData.disabled);
        }
      });
  }

  clickOn() {
    if (this.buttonData) {
      this.#service.clickOnButton(this.buttonData.id);
    }
  }
}
