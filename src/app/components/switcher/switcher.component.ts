import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { SwitcherStyles } from './interface/SwitcherStyles';

@Component({
  selector: 'switcher',
  imports: [],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitcherComponent implements OnInit {
  @Input() styles: SwitcherStyles = {};

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

  id: string = '';

  // this method setup some new styles for custom checkbox from parent
  #setCssVariable() {
    const dash = '--';
    let lineStyles: string = '';

    const mixStyles = { ...this.defaultStyles, ...this.styles };

    for (let item of Object.keys(mixStyles) as (keyof SwitcherStyles)[]) {
      lineStyles = lineStyles + dash + item + ': ' + mixStyles[item] + '; ';
    }

    this.#render.setStyle(this.#elRef.nativeElement, 'background', 'red');
  }

  ngOnInit(): void {
    // This code generates unik ID for the component
    this.id = uuidv4();
    this.#setCssVariable();
  }
}
