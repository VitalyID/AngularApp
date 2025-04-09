import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
  @Input({ required: true }) color: string = '';
  @Output() userSetColor = new EventEmitter();

  newColor: string = this.color;

  setColor(newColor: string) {
    this.userSetColor.emit(newColor);
  }
}
