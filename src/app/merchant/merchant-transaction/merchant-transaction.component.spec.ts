import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantTransactionComponent } from './merchant-transaction.component';

describe('MerchantTransactionComponent', () => {
  let component: MerchantTransactionComponent;
  let fixture: ComponentFixture<MerchantTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
