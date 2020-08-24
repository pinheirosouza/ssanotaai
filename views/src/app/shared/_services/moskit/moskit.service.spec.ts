import { TestBed } from '@angular/core/testing';

import { MoskitService } from './moskit.service';

describe('MoskitService', () => {
  let service: MoskitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoskitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
