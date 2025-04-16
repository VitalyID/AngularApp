import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[escClose]',
})
export class EscCloseDirective {
  @Output() menuClosedByESC = new EventEmitter<boolean>();
  isEscKeyPressed: boolean = false;
  constructor() {}

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEscape(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.isEscKeyPressed = true;
      this.menuClosedByESC.emit(this.isEscKeyPressed);
    }
  }
}
