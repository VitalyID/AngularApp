import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { AsideComponent } from './components/layouts/aside/aside.component';
import { SectionComponent } from './components/section/section.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';

@NgModule({
  imports: [BrowserModule, SvgIconComponent],
  exports: [
    AsideComponent,
    SectionComponent,
    ButtonsComponent,
    SvgIconComponent,
  ],
  declarations: [AsideComponent, SectionComponent, ButtonsComponent],
  providers: [],
})
export class SharedModule {}
