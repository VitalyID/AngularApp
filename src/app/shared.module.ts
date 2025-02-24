import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { AsideComponent } from './components/layouts/aside/aside.component';
import { SectionComponent } from './components/section/section.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';

@NgModule({
  imports: [CommonModule, RouterModule, SvgIconComponent],
  exports: [
    AsideComponent,
    SectionComponent,
    ButtonsComponent,
    SvgIconComponent,
    RouterModule,
  ],
  declarations: [AsideComponent, SectionComponent, ButtonsComponent],
  providers: [],
})
export class SharedModule {}
