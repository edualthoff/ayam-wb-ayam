import { TestBed } from '@angular/core/testing';

import { LoadFileIconService } from './load-file-icon.service';

describe('LoadFileIconService', () => {
  let service: LoadFileIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadFileIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
