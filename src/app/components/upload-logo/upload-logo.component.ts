import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ButtonData } from './../../types/sectionItem';

@Component({
  selector: 'upload-logo',
  imports: [SharedModule],
  templateUrl: './upload-logo.component.html',
  styleUrl: './upload-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadLogoComponent implements AfterViewInit {
  @ViewChild('fileInput') input: any;
  btnText: ButtonData = {
    iconClass: 'icon-icon-upload',
    id: 6,
    text: 'Загруите логотип',
    background: 'none',
    color: '#313436',
    borderStyle: 'none',
    boxShadow: 'none',
  };

  ngAfterViewInit(): void {
    console.log(this.input);
  }
}
