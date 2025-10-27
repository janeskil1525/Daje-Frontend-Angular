import { TestBed } from '@angular/core/testing';

import { TableObjectViewService } from './table.object.view.service';

describe('TableObjectViewService', () => {
  let service: TableObjectViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableObjectViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
