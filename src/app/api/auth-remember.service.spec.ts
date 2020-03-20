import { TestBed } from '@angular/core/testing';

import { AuthRememberService } from './auth-remember.service';

describe('AuthRememberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthRememberService = TestBed.get(AuthRememberService);
    expect(service).toBeTruthy();
  });
});
