import { Component, Input } from '@angular/core';
import { ButtonClass, ButtonData } from '../../types/sectionItem';

@Component({
  selector: 'app-buttons',
  standalone: false,

  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  @Input() buttonData!: ButtonData;
  // @Input() buttonDataInput?: ButtonData;
  @Input() buttonStyles?: ButtonClass;
}
