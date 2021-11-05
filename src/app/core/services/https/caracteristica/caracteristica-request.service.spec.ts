import { TestBed } from '@angular/core/testing';

import { CaracteristicaRequestService } from './caracteristica-request.service';

describe('CaracteristicaRequestService', () => {
  let service: CaracteristicaRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaracteristicaRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
