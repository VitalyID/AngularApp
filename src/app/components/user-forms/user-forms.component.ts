import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { ButtonDataInput } from '../../types/sectionItem';

@Component({
  selector: 'user-forms',
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './user-forms.component.html',
  styleUrl: './user-forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormsComponent {
  @Input() buttonDataInput!: ButtonDataInput;

  sectionInputDate = new FormGroup({
    dateFrom: new FormControl('2025-01-01'),
    dateTo: new FormControl('2025-05-10'),
  });
  constructor(private cdr: ChangeDetectorRef) {}

  sendValue() {
    console.log(this.sectionInputDate.value);
  }

  ngOnChanges(): void {
    console.log(this.buttonDataInput);
  }
}
