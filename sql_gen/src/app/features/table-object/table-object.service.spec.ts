import { TestBed } from '@angular/core/testing';

import { TableObjectService } from './table-object.service';

describe('TableObjectService', () => {
  let service: TableObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
