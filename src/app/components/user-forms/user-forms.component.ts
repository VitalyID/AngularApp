import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { DateTimeUserOperations } from '../../types/sectionItem';

@Component({
  selector: 'user-forms',
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './user-forms.component.html',
  styleUrl: './user-forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormsComponent {
  @Input() buttonDataInput!: DateTimeUserOperations;

  sectionInputDate = new FormGroup({
    dateFrom: new FormControl('2025-01-01'),
    dateTo: new FormControl('2025-05-10'),
  });

  // it's be send data to server later
  sendValue() {
    console.log(this.sectionInputDate.value);
  }
}
