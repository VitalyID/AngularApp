import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FeedbackData } from './types/interfces/feedback';

@Component({
  selector: 'feedbacks',
  imports: [],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksComponent implements OnChanges {
  @Input() textFromParent: FeedbackData = {
    text: '',
    readonly: false,
  };

  readonly = this.textFromParent.readonly;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['textFromParent']) {
      this.readonly = this.textFromParent.readonly;
    }
  }
}
