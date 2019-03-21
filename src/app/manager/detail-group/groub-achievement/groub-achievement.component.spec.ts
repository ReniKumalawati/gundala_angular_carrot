import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroubAchievementComponent } from './groub-achievement.component';

describe('GroubAchievementComponent', () => {
  let component: GroubAchievementComponent;
  let fixture: ComponentFixture<GroubAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroubAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroubAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
