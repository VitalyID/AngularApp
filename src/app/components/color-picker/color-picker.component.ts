import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
// import { TinyColor } from '@ctrl/tinycolor';

@Component({
  selector: 'color-picker',
  imports: [CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent implements AfterViewInit {
  // @ViewChild('colorSection') colorSection?: ElementRef;

  // readonly #render = inject(Renderer2);

  // tmp?: ElementRef;
  gradientColors: string[] = [];

  openColorSection: boolean = false;

  ColorSection() {
    this.openColorSection = true;
    // const baseColor = new TinyColor('red'); // Начальный цвет

    // const gradientColors = baseColor.analogous().map((t) => t.toHexString());
    // console.log(gradientColors);
    // console.log(this.colorSection);
    // let tmp = '';
    // for (let item of gradientColors) {
    //   tmp = tmp + String(item) + ', ';
    // }

    // const gradient = ' linear-gradient(36deg, ' + tmp + ')';
    // console.log(gradient);

    // this.#render.setStyle(
    //   this.tmp?.nativeElement,
    //   'background',
    //   'linear-gradient(36deg, #ff0000, #ff0066, #ff0033, #ff0000, #ff3300, #ff6600)'
    // );
    // this.openColorSection = false;
  }

  // generateGradient(): string {
  //   return `linear-gradient(to right, ${this.gradientColors.join(', ')})`;
  // }

  chooseColor(data: MouseEvent) {
    // console.log(this.tmp?.nativeElement);

    // this.#render.setStyle(this.tmp?.nativeElement, 'background-color', 'red');
    this.openColorSection = false;
  }

  ngAfterViewInit(): void {
    // console.log(this.colorSection);
    // this.tmp = this.colorSection;
  }
}
