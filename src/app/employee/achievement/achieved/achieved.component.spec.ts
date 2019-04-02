import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievedComponent } from './achieved.component';

describe('AchievedComponent', () => {
  let component: AchievedComponent;
  let fixture: ComponentFixture<AchievedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
