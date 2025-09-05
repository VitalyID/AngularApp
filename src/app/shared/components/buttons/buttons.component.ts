import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  effect,
  inject,
  Injector,
  Input,
  OnChanges,
  runInInjectionContext,
  signal,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerConfig } from '../spinner/types/interfaces/spinnerConfig';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent implements OnChanges, AfterViewInit {
  @Input() background?: string = '';
  @Input() color?: string = '';
  @Input() borderStyle?: string = '';
  @Input() boxShadow?: string = '';
  @Input() isActive?: boolean = false;
  @Input() borderRadius?: string = '';
  @Input() id?: string = '';
  @Input() disabled?: boolean = false;
  @Input() text?: string = '';
  @Input() classSvgFonts?: string = '';
  @Input() paddings?: string = '';
  @Input() innerComponent?: SpinnerConfig;

  @ViewChild('component', { read: ViewContainerRef })
  hostContainerRef!: ViewContainerRef;

  readonly #inject = inject(Injector);

  dynamicComp: ComponentRef<any> | null = null;
  buttonComponent: Type<any> = ButtonsComponent;
  setComponent = signal<SpinnerConfig>({
    isActive: false,
    container: ButtonsComponent,
    insertComponent: SpinnerComponent,
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['innerComponent']) {
      console.log('debug id: ', this.id, this.innerComponent?.id);

      if (
        this.innerComponent?.container === ButtonsComponent &&
        this.id === this.innerComponent.id
      ) {
        this.setComponent.set(this.innerComponent);
      }
    }
  }

  ngAfterViewInit(): void {
    runInInjectionContext(this.#inject, () => {
      effect(() => {
        // debug switch (this.setComponent().isActive) {
        switch (1 === 1) {
          case true:
            if (!this.setComponent().container || !this.hostContainerRef) {
              return;
            }

            if (this.dynamicComp !== null) return;

            this.dynamicComp = this.hostContainerRef.createComponent(
              this.setComponent().insertComponent,
            );
            this.disabled = true;
            break;
          case false:
            this.disabled = false;
            this.dynamicComp?.destroy();
            this.dynamicComp = null;
            if (!this.hostContainerRef) return;
            this.hostContainerRef.clear();
            break;
        }
      });
    });
  }
}
