import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appEscClose]',
})
export class EscCloseDirective {
  menuClose = output<boolean>();

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEscape(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.menuClose.emit(true);
    }
  }
}
