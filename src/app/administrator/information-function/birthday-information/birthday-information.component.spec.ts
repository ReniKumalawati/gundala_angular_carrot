import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayInformationComponent } from './birthday-information.component';

describe('BirthdayInformationComponent', () => {
  let component: BirthdayInformationComponent;
  let fixture: ComponentFixture<BirthdayInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdayInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
