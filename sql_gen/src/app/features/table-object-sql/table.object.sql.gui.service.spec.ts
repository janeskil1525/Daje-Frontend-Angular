import { TestBed } from '@angular/core/testing';

import { TableObjectSqlGuiService } from './table.object.sql.gui.service';

describe('TableObjectSqlGuiService', () => {
  let service: TableObjectSqlGuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableObjectSqlGuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
