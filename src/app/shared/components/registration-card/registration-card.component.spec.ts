import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RegistrationCardComponent } from './registration-card.component';
import { BankCard } from '../../../state/user/user.models';
import { NgxsModule } from '@ngxs/store';

describe('RegistrationCardComponent', () => {
  let component: RegistrationCardComponent;
  let fixture: ComponentFixture<RegistrationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationCardComponent, NgxsModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationCardComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should to display title', () => {
    component.isTitle = true;
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3).toBeTruthy();
  });

  it('should not display a title', () => {
    component.isTitle = undefined;
    fixture.detectChanges();
    const notH3 = fixture.nativeElement.querySelector('h3');
    expect(notH3).toBeNull();
  });

  it('should to display buttons', () => {
    component.isButtons = true;
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelector('.button');
    expect(buttons).toBeTruthy();
  });

  it('should do not display buttons at all', () => {
    component.isButtons = undefined;
    fixture.detectChanges();
    const notBtns = fixture.nativeElement.querySelector('.button');
    expect(notBtns).toBeNull();
  });

  it('should emit bank card to parent', fakeAsync(() => {
    const emitSpy = spyOn(component.cardDataChange, 'emit');
    component.generalSubscriptionFields();
    component.cardForm.patchValue({
      card: '1111 2222 3333 4444',
      data: '05/36',
      cvc: '566',
    });
    tick(300);

    const expectEmiBankCard: BankCard = {
      card_number: '1111222233334444',
      expiry: '05/36',
      cvc: '566',
      isActive: true,
    };

    expect(emitSpy).toHaveBeenCalledOnceWith([expectEmiBankCard]);
  }));
});
