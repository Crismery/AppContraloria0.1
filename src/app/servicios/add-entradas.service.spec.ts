import { TestBed } from '@angular/core/testing';

import { AddEntradasService } from './add-entradas.service';

describe('AddEntradasService', () => {
  let service: AddEntradasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEntradasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
