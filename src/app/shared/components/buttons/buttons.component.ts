import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  effect,
  inject,
  Injector,
  Input,
  runInInjectionContext,
  Signal,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent implements AfterViewInit {
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
  @Input() propComp?: Type<Component> | null = null;
  @Input() propState?: Signal<boolean | undefined>;

  @ViewChild('component', { read: ViewContainerRef })
  hostContainerRef!: ViewContainerRef;

  readonly #inject = inject(Injector);

  dynamicComp: ComponentRef<any> | null = null;

  ngAfterViewInit(): void {
    if (!this.propState) return;
    if (!this.hostContainerRef) return;

    runInInjectionContext(this.#inject, () => {
      effect(() => {
        console.log('debug this.propState', this.propState!());

        switch (this.propState!()) {
          case true:
            if (!this.propComp || !this.hostContainerRef) return;

            if (this.dynamicComp) return;
            this.hostContainerRef.clear();
            this.dynamicComp = this.hostContainerRef.createComponent(
              this.propComp,
            );
            this.disabled = true;
            break;
          case false:
            this.disabled = false;
            this.hostContainerRef.clear();
            this.dynamicComp?.destroy();
        }
      });
    });
  }
}
