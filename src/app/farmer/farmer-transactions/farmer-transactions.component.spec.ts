import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerTransactionsComponent } from './farmer-transactions.component';

describe('FarmerTransactionsComponent', () => {
  let component: FarmerTransactionsComponent;
  let fixture: ComponentFixture<FarmerTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
