import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PopupService } from '../../../services/popup.service';
import { Popup } from '../../../types/interfaces/popup';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'popup',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss',
})
export class PopupComponent implements OnInit, AfterViewInit {
  popupData: Popup | null = null;
  iconClose: string = 'icon-close';

  readonly #popupService = inject(PopupService);
  readonly #DestroyRef = inject(DestroyRef);

  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  hostContentRef!: ViewContainerRef;

  ngOnInit(): void {
    this.#popupService.popupState$
      .pipe(takeUntilDestroyed(this.#DestroyRef))
      .subscribe((popupData) => {
        this.popupData = popupData;
        this.#loadContent();
      });
  }

  ngAfterViewInit(): void {
    this.#loadContent();
  }

  #loadContent() {
    if (this.hostContentRef && this.popupData !== null) {
      this.hostContentRef.clear();
    }
    if (this.popupData !== null && this.popupData.component) {
      // debug: ERROR IS HEIR
      const componentRef = this.hostContentRef.createComponent(
        this.popupData?.component,
      );
      if (this.popupData.componentProps) {
        componentRef.setInput(
          'propsForHostContent',
          this.popupData.componentProps,
        );
      }
    }
  }

  closePopUp() {
    if (!this.popupData?.id) return;
    this.#popupService.closePopup({ ...this.popupData, state: false });
  }
}
