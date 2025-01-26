import { Component, Input } from '@angular/core';
import { ButtonData } from '../../types/sectionItem';
import { ButtonService } from './service/buttons.component.service';

@Component({
  selector: 'app-buttons',
  standalone: false,

  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  @Input() buttonData?: ButtonData;

  constructor(private service: ButtonService) {}

  clickOn() {
    if (this.buttonData) {
      this.service.clickOnButton(this.buttonData.id);
    }
  }
}
