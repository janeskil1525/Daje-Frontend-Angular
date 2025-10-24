import { TestBed } from '@angular/core/testing';

import { TableObjectSqlService } from './table.object.sql.service';

describe('TableObjectSqlService', () => {
  let service: TableObjectSqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableObjectSqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
