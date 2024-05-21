import { TestBed } from '@angular/core/testing';

import { ResivircorreoService } from './resivircorreo.service';

describe('ResivircorreoService', () => {
  let service: ResivircorreoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResivircorreoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
