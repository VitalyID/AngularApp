import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() menuClose = new EventEmitter<boolean>();
  @Input() menuState: boolean = false;

  readonly #elRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const click = this.#elRef.nativeElement.contains(event.target as Node);

    if (!click && this.menuState) {
      this.menuClose.emit(true);
    }
  }
}
