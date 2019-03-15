import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAwardSectionComponent } from './import-award-section.component';

describe('ImportAwardSectionComponent', () => {
  let component: ImportAwardSectionComponent;
  let fixture: ComponentFixture<ImportAwardSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAwardSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAwardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
