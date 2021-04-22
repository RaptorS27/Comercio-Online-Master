import { TestBed } from '@angular/core/testing';

import { CategoriaSeleccionadaService } from './categoria-seleccionada.service';

describe('CategoriaSeleccionadaService', () => {
  let service: CategoriaSeleccionadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaSeleccionadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
