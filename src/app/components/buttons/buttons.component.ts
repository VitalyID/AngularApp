import { Component, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonData } from './../../types/sectionItem';
import { ListenerService } from './service/buttonListenerStatus.compoent.service';
import { ButtonService } from './service/buttons.component.service';

@Component({
  selector: 'app-buttons',
  standalone: false,

  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  @Input() buttonData?: ButtonData;
  // @Input() data?: number = 2
  readonly #listenerService = inject(ListenerService);

  // public id : number = 2

  constructor(private service: ButtonService) {
    this.#listenerService.aboutBTN$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.buttonData = data.data;
      });
  }

  clickOn() {
    if (this.buttonData) {
      this.service.clickOnButton(this.buttonData.id);
    }
  }
}
