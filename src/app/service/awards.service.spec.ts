import { TestBed } from '@angular/core/testing';

import { AwardsService } from './awards.service';

describe('AwardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwardsService = TestBed.get(AwardsService);
    expect(service).toBeTruthy();
  });
});
