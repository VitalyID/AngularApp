import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
// import { ColorPicker, ColorPickerStore } from '../../../agents/state/agents.state'
// import { Observable } from 'rxjs'

@Component({
  selector: 'color-picker',
  standalone: true,
  imports: [CommonModule, ColorPickerModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent {
  @Output() userSetColor = new EventEmitter();

  color: string = '#eeeff2';
  newColor: string = this.color;

  setColor(newColor: string) {
    console.log(newColor);
    this.userSetColor.emit(newColor);
  }
}
