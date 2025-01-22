import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AsideComponent } from './components/aside/aside.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { SectionComponent } from './components/section/section.component';

@NgModule({
  imports: [BrowserModule],
  exports: [AsideComponent, SectionComponent, ButtonsComponent],
  declarations: [AsideComponent, SectionComponent, ButtonsComponent],
  providers: [],
})
export class SharedModule {}
