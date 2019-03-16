import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSocialFoundationSectionComponent } from './import-social-foundation-section.component';

describe('ImportSocialFoundationSectionComponent', () => {
  let component: ImportSocialFoundationSectionComponent;
  let fixture: ComponentFixture<ImportSocialFoundationSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportSocialFoundationSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSocialFoundationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
