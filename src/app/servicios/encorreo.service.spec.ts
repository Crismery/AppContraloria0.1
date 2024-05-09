import { TestBed } from '@angular/core/testing';

import { EncorreoService } from './encorreo.service';

describe('EncorreoService', () => {
  let service: EncorreoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncorreoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
