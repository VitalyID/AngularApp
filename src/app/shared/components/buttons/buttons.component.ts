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
  @Input() isActive?: boolean = true;
  @Input() borderRadius?: string = '';
  @Input({ required: true }) id: string = '';
  @Input() disabled?: false;
  @Input({ required: true }) text: string = '';
  @Input() classSvgFonts?: string = '';
}
