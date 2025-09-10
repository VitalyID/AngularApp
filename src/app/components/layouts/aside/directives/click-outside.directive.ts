import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output() menuClose = new EventEmitter<boolean>();
  readonly menuState = input<boolean>(false);

  readonly #elRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const click = this.#elRef.nativeElement.contains(event.target as Node);

    if (!click && this.menuState()) {
      this.menuClose.emit(true);
    }
  }
}
