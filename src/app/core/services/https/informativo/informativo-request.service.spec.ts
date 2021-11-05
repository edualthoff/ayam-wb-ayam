import { TestBed } from '@angular/core/testing';

import { InformativoRequestService } from './informativo-request.service';

describe('InformativoRequestService', () => {
  let service: InformativoRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformativoRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
