import { TestBed } from '@angular/core/testing';

import { TableObjectDatatypeService } from './table-object-datatype.service';

describe('TableObjectDatatypeService', () => {
  let service: TableObjectDatatypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableObjectDatatypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
