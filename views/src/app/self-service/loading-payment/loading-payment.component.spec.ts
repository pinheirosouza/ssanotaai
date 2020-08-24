import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPaymentComponent } from './loading-payment.component';

describe('LoadingPaymentComponent', () => {
  let component: LoadingPaymentComponent;
  let fixture: ComponentFixture<LoadingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingPaymentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
