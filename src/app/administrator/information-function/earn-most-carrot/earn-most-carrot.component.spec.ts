import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnMostCarrotComponent } from './earn-most-carrot.component';

describe('EarnMostCarrotComponent', () => {
  let component: EarnMostCarrotComponent;
  let fixture: ComponentFixture<EarnMostCarrotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnMostCarrotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnMostCarrotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
