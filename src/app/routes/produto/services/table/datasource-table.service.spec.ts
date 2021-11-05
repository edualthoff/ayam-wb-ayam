import { TestBed } from '@angular/core/testing';

import { DatasourceTableService } from './datasource-table.service';

describe('DatasourceTableService', () => {
  let service: DatasourceTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasourceTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
