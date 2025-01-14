import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  standalone: false,

  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  @Input() btnText : string = 'Some text';

}
