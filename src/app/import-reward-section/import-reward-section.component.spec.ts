import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRewardSectionComponent } from './import-reward-section.component';

describe('ImportRewardSectionComponent', () => {
  let component: ImportRewardSectionComponent;
  let fixture: ComponentFixture<ImportRewardSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportRewardSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportRewardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
