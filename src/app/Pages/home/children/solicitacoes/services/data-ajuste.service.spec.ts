import { TestBed } from '@angular/core/testing';

import { DataAjusteService } from './data-ajuste.service';

describe('DataAjusteService', () => {
  let service: DataAjusteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAjusteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
