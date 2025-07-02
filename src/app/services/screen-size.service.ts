import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, debounceTime, fromEvent, Subscription } from 'rxjs';
import { Breakpoints } from './../types/interfaces/breakpoints';

@Injectable({ providedIn: 'root' })
export class ScreenSizeService {
  breakpoints: Breakpoints = {
    '1100': false,
    '1000': false,
    '768': false,
    '685': false,
  };

  private resizeSubscription: Subscription;
  isMobileSubject$ = new BehaviorSubject<Breakpoints>(this.UpdateBreakpoints());

  readonly #DestroyRef = inject(DestroyRef);

  constructor() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100), takeUntilDestroyed(this.#DestroyRef))
      .subscribe(() => {
        this.isMobileSubject$.next(this.UpdateBreakpoints());
      });
  }

  UpdateBreakpoints(): Breakpoints {
    const arrKey = Object.keys(this.breakpoints) as (keyof Breakpoints)[];

    arrKey.forEach((brPnt) => {
      this.breakpoints = {
        ...this.breakpoints,
        [brPnt]: matchMedia(`(max-width: ${brPnt}px)`).matches,
      };
    });

    return this.breakpoints;
  }
}
