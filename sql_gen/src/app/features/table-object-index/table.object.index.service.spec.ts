import { TestBed } from '@angular/core/testing';

import { TableObjectIndexService } from './table.object.index.service';

describe('TableObjectIndexService', () => {
  let service: TableObjectIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableObjectIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
