import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  // @Input() buttonData?: ButtonData;
  @Input() background?: string = '';
  @Input() color?: string = '';
  @Input() borderStyle?: string = '';
  @Input() boxShadow?: string = '';
  @Input() isActive?: boolean = false;
  @Input() borderRadius?: string = '';
  @Input() id?: string = '';
  @Input() disabled?: boolean = false;
  @Input() text?: string = '';
  @Input() classSvgFonts?: string = '';
  @Input() paddings?: string = '';
}
