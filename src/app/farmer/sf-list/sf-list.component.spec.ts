import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfListComponent } from './sf-list.component';

describe('SfListComponent', () => {
  let component: SfListComponent;
  let fixture: ComponentFixture<SfListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
