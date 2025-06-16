import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule],
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // title = 'AppOnAngular';
  // constructor(private elDOM: ElementRef, private render: Renderer2) {}
  // ngAfterViewInit(): void {
  //   const svgSprite = this.render.createElement('img');
  //   this.render.setAttribute(
  //     svgSprite,
  //     'src',
  //     'assets/icons/svg-sprite/symbol-defs.svg'
  //   );
  //   this.render.setStyle(svgSprite, 'display', 'none');
  //   this.render.appendChild(this.elDOM.nativeElement, svgSprite);
  // }
}
