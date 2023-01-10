import { TestBed } from '@angular/core/testing';

import { AsignaccionService } from './asignaccion.service';

describe('AsignaccionService', () => {
  let service: AsignaccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignaccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
