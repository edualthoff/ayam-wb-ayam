import { TestBed } from '@angular/core/testing';

import { CaracteristicaTableService } from './caracteristica-table.service';

describe('CaracteristicaTableService', () => {
  let service: CaracteristicaTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaracteristicaTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
