import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorManagerComponent } from './senior-manager.component';

describe('SeniorManagerComponent', () => {
  let component: SeniorManagerComponent;
  let fixture: ComponentFixture<SeniorManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
