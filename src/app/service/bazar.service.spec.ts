import { TestBed } from '@angular/core/testing';

import { BazarService } from './bazar.service';

describe('BazarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BazarService = TestBed.get(BazarService);
    expect(service).toBeTruthy();
  });
});
