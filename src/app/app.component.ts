import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { HomeComponent } from './components/layouts/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HomeComponent],
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'AppOnAngular';

  constructor(private elDOM: ElementRef, private render: Renderer2) {}

  ngAfterViewInit(): void {
    const svgSprite = this.render.createElement('img');
    this.render.setAttribute(
      svgSprite,
      'src',
      'assets/icons/svg-sprite/symbol-defs.svg'
    );
    this.render.setStyle(svgSprite, 'display', 'none');
    this.render.appendChild(this.elDOM.nativeElement, svgSprite);
  }
}
