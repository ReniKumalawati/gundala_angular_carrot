import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSFComponent } from './detail-sf.component';

describe('DetailSFComponent', () => {
  let component: DetailSFComponent;
  let fixture: ComponentFixture<DetailSFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
