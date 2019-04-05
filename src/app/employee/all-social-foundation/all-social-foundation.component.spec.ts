import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSocialFoundationComponent } from './all-social-foundation.component';

describe('AllSocialFoundationComponent', () => {
  let component: AllSocialFoundationComponent;
  let fixture: ComponentFixture<AllSocialFoundationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSocialFoundationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSocialFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
