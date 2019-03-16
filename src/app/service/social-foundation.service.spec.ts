import { TestBed } from '@angular/core/testing';

import { SocialFoundationService } from './social-foundation.service';

describe('SocialFoundationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialFoundationService = TestBed.get(SocialFoundationService);
    expect(service).toBeTruthy();
  });
});
