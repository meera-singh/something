import { TestBed, inject } from '@angular/core/testing';

import { UserhService } from './userh.service';

describe('UserhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserhService]
    });
  });

  it('should be created', inject([UserhService], (service: UserhService) => {
    expect(service).toBeTruthy();
  }));
});
