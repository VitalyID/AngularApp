import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ButtonData } from '../../types/sectionItem';
import { ButtonClass } from '../../types/sectionItem';

@Component({
  selector: 'app-buttons',
  standalone: false,

  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  @Input() buttonData !: ButtonData;
  @Input() buttonStyles ?: ButtonClass;
}
