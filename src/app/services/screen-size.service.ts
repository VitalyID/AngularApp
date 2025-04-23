import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, Subscription } from 'rxjs';
import { Breakpoints } from './../types/interfaces/breakpoints';

@Injectable({ providedIn: 'root' })
export class ScreenSizeService implements OnDestroy {
  breakpoints: Breakpoints = {
    '1000': false,
    '768': false,
    // '650': false,
    // '520': false,
  };

  private resizeSubscription: Subscription | null = null;
  isMobileSubject$ = new BehaviorSubject<Breakpoints>(this.UpdateBreakpoints());

  constructor() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.isMobileSubject$.next(this.UpdateBreakpoints());
      });
  }

  UpdateBreakpoints(): Breakpoints {
    const arrKey = Object.keys(this.breakpoints) as Array<keyof Breakpoints>;

    arrKey.forEach((brPnt) => {
      this.breakpoints = {
        ...this.breakpoints,
        [brPnt]: matchMedia(`(max-width: ${brPnt}px)`).matches,
      };
    });

    return this.breakpoints;
  }

  ngOnDestroy(): void {
    this.resizeSubscription?.unsubscribe();
  }
}
