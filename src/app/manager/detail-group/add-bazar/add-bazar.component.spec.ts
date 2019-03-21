import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBazarComponent } from './add-bazar.component';

describe('AddBazarComponent', () => {
  let component: AddBazarComponent;
  let fixture: ComponentFixture<AddBazarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBazarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
