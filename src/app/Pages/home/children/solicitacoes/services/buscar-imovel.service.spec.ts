import { TestBed } from '@angular/core/testing';

import { BuscarImovelService } from './buscar-imovel.service';

describe('BuscarImovelService', () => {
  let service: BuscarImovelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarImovelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
