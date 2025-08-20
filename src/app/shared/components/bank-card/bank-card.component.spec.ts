import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankCardComponent } from './bank-card.component';

describe('BankCardComponent', () => {
  let component: BankCardComponent;
  let fixture: ComponentFixture<BankCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BankCardComponent);
    component = fixture.componentInstance;
  });

  it('should get balance', () => {
    expect(component).toBeTruthy();
  });

  it('should render balance card', () => {
    component.balance = 1000;
    fixture.detectChanges();

    const balanceRender =
      fixture.nativeElement.querySelector('.bankCard__balance');
    expect(balanceRender.textContent).toContain('1000');
  });

  it('should render name bank card-s holder', () => {
    component.name = 'Sidorov';
    fixture.detectChanges();

    const nameRender = fixture.nativeElement.querySelector('.bankCard__name');
    expect(nameRender.textContent).toContain('Sidorov');
  });

  it('should render img(visa-master) in bank card', () => {
    component.typeCard = '../../../assets/images/Visa card.png';
    fixture.detectChanges();

    const iconTypeCardrender = fixture.nativeElement.querySelector('img');
    expect(decodeURIComponent(iconTypeCardrender?.src)).toContain(
      'Visa card.png',
    );
    expect(iconTypeCardrender?.alt).toContain('Тип карточки');
  });

  it('should render bank card number', () => {
    component.number = '0000 0000 0000 0000';
    fixture.detectChanges();
    const number = fixture.nativeElement.querySelector('.bankCard__number');
    expect(number.textContent).toContain('0000 0000 0000 0000');
  });

  it('should render data banc card', () => {
    component.data = '01/26';
    fixture.detectChanges();
    const data = fixture.nativeElement.querySelector('.bankCard__data');

    expect(data.textContent).toContain('01/26');
  });

  it('should render pipe card number', () => {
    component.number = '1111222233334444';
    fixture.detectChanges();
    const pipeCheck = fixture.nativeElement.querySelector('.bankCard__number');
    expect(pipeCheck.textContent).toBe('1111 2222 3333 4444');
  });
});
