import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FeedbackData } from './types/interfces/feedback';

@Component({
  selector: 'feedbacks',
  imports: [],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksComponent {
  @Input() feedbackData: FeedbackData = {
    text: '',
    readonly: false,
  };
}
