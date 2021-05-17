import { TestBed } from '@angular/core/testing';

import { MonitoradorService } from './monitorador.service';

describe('MonitoradorService', () => {
  let service: MonitoradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
