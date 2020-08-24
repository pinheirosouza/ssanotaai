import { TestBed } from '@angular/core/testing';

import { GetAddressByCepService } from './get-address-by-cep.service';

describe('GetAddressByCepService', () => {
  let service: GetAddressByCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAddressByCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
