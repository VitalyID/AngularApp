import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'custom-check-box',
  imports: [SvgIconComponent, FormsModule],
  templateUrl: './custom-check-box.component.html',
  styleUrl: './custom-check-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCheckBoxComponent {
  @Input() iconState = signal<boolean>(false);
  @Output() setCheckbox = new EventEmitter<boolean>();

  icon: string = 'checkbox';
  iconActive: string = 'checkboxActive';

  toggle(event: Event) {
    event.preventDefault();
    this.iconState.set(!this.iconState());
  }

  setUser(event: Event) {
    const user = event.target as HTMLInputElement;
    this.setCheckbox.emit(user.checked);
  }
}
