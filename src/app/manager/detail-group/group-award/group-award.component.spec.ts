import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAwardComponent } from './group-award.component';

describe('GroupAwardComponent', () => {
  let component: GroupAwardComponent;
  let fixture: ComponentFixture<GroupAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
