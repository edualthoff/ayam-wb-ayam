import { TestBed } from '@angular/core/testing';

import { ProdutoRequestService } from './produto-request.service';

describe('ProdutoRequestService', () => {
  let service: ProdutoRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
