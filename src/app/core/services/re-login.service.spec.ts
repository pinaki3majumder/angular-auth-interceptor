import { TestBed } from '@angular/core/testing';

import { ReLoginService } from './re-login.service';

describe('ReLoginService', () => {
  let service: ReLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
