import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[escClose]',
})
export class EscCloseDirective {
  @Output() menuClose = new EventEmitter<boolean>();
  constructor() {}

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEscape(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.menuClose.emit(true);
    }
  }
}
