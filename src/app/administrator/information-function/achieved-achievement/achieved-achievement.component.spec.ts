import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievedAchievementComponent } from './achieved-achievement.component';

describe('AchievedAchievementComponent', () => {
  let component: AchievedAchievementComponent;
  let fixture: ComponentFixture<AchievedAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievedAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievedAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
