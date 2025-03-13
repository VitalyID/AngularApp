import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { SwitcherStyles } from './interface/SwitcherStyles';
import { SwitcherData } from './interface/switcherDataTransmit';
import { SwitcherStateService } from './service/switch.service';

@Component({
  selector: 'switcher',
  imports: [],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitcherComponent implements OnInit {
  @Input() styles: SwitcherStyles = {};
  @Input() title: string = '';
  @Output() statusSwitcher = new EventEmitter();

  switcherForParent: SwitcherData = {
    title: '',
    value: false,
  };

  defaultStyles: SwitcherStyles = {
    outerWidth: '64px',
    outerHeight: '32px',
    outerBorderRadius: '18px',
    outerBackground: '#e1e3e1',
    outerBackgroundAfterAnim: '#3bc76b',
    innerWidth: '24px',
    innerHeight: '24px',
    innerBackground: '#ffffff;',
  };

  readonly #elRef = inject(ElementRef);
  readonly #render = inject(Renderer2);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #switcherService = inject(SwitcherStateService);

  id: string = '';
  value: boolean = false;

  // this method setup some new styles for custom checkbox from parent
  #setCssVariable() {
    const dash = '--';
    let lineStyles: string = '';

    const mixStyles = { ...this.defaultStyles, ...this.styles };

    for (let item of Object.keys(mixStyles) as (keyof SwitcherStyles)[]) {
      lineStyles = lineStyles + dash + item + ': ' + mixStyles[item] + '; ';
    }

    this.#render.setProperty(this.#elRef.nativeElement, 'style', lineStyles);
    this.#cdr.markForCheck();
  }

  // in this realization we get status checkbox only after changed them.
  sendValue(data: Event) {
    this.value = (data.target as HTMLInputElement).checked;
    this.switcherForParent = { title: this.title, value: this.value };
    // this.statusSwitcher.emit(this.switcherForParent);
    this.#switcherService.getStatusSwitcher(this.switcherForParent);
  }

  ngOnInit(): void {
    // This code generates unik ID for the component
    this.id = uuidv4();
    this.#setCssVariable();
  }
}
