import { TestBed, inject } from '@angular/core/testing';

import { LoginuserService } from './loginuser.service';

describe('LoginuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginuserService]
    });
  });

  it('should be created', inject([LoginuserService], (service: LoginuserService) => {
    expect(service).toBeTruthy();
  }));
});
