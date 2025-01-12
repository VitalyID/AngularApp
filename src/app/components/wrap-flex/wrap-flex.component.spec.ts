import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapFlexComponent } from './wrap-flex.component';

describe('WrapFlexComponent', () => {
  let component: WrapFlexComponent;
  let fixture: ComponentFixture<WrapFlexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapFlexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
