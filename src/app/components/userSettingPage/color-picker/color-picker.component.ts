import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'color-picker',
  imports: [CommonModule, ColorPickerModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent {
  color: string = '#eeeff2';

  newColor: string = this.color;

  setColor(newColor: string) {
    console.log(newColor);
  }
}
