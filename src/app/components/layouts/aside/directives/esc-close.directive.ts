import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[escClose]',
})
export class EscCloseDirective {
  @Output() menuClosed = new EventEmitter<boolean>();
  isEscKeyPressed: boolean = false;
  constructor() {}

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEscape(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.isEscKeyPressed = false;
      this.menuClosed.emit(this.isEscKeyPressed);
    }
  }
}
