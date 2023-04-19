import { TestBed } from '@angular/core/testing';

import { SignupAsAdminService } from './signup-as-admin.service';

describe('SignupAsAdminService', () => {
  let service: SignupAsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupAsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
