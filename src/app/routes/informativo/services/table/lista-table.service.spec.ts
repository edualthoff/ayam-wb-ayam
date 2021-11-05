import { TestBed } from '@angular/core/testing';

import { ListaTableService } from './lista-table.service';

describe('ListaTableService', () => {
  let service: ListaTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
