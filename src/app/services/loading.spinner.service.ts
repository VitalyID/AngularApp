import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { SpinnerService } from '../shared/components/spinner/serices/spinner.service';

@Injectable({ providedIn: 'root' })
export class LoadingSpinnerService {
  readonly #spinner = inject(SpinnerService);

  activeTasks: WritableSignal<string[]> = signal([]);

  addTask(task: string) {
    this.activeTasks.update((current) => [...current, task]);
  }

  removeTask(task: string) {
    if (!this.activeTasks().includes(task)) return;
    this.activeTasks.update((current) =>
      current.filter((item) => item !== task)
    );
  }

  spinner = effect(() => {
    if (this.activeTasks().length > 0) {
      this.#spinner.enableSpinner();
    } else {
      this.#spinner.disableSpinner();
    }
  });

  constructor() {}
}
