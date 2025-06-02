import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonData } from '../../../types/sectionItem';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  @Input() buttonData?: ButtonData;

  // readonly #listenerService = inject(ListenerService);
  // readonly #service = inject(ButtonService);
  // readonly #destroyRef: DestroyRef = inject(DestroyRef);

  // // id необходим для проверки и дальнейшей логики
  // public id: number = 2;

  // ngOnInit(): void {
  //   this.#listenerService.aboutBTN$
  //     .pipe(takeUntilDestroyed(this.#destroyRef))
  //     .subscribe((data) => {
  //       if (this.buttonData && data.data.id === this.id) {
  //         this.buttonData.disabled = data.data.disabled;
  //       }
  //     });
  // }

  // clickOn() {
  //   if (this.buttonData) {
  //     this.#service.clickOnButton(this.buttonData.id);
  //   }
  // }
}
