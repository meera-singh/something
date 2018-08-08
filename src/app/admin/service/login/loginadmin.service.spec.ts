import { TestBed, inject } from '@angular/core/testing';

import { LoginadminService } from './loginadmin.service';

describe('LoginadminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginadminService]
    });
  });

  it('should be created', inject([LoginadminService], (service: LoginadminService) => {
    expect(service).toBeTruthy();
  }));
});
