import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSocialFoundationComponent } from './group-social-foundation.component';

describe('GroupSocialFoundationComponent', () => {
  let component: GroupSocialFoundationComponent;
  let fixture: ComponentFixture<GroupSocialFoundationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSocialFoundationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSocialFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
