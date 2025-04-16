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
  @Output() menuClosedByClick = new EventEmitter<boolean>();
  @Input() menuState: boolean = false;

  clickOutside: boolean = false;

  readonly #elRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const click = this.#elRef.nativeElement.contains(event.target as Node);

    if (!click && this.menuState) {
      this.clickOutside = true;
      this.menuClosedByClick.emit(this.clickOutside);
    }
  }
}
