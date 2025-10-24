import { TestBed } from '@angular/core/testing';

import { TableObjectIndexGuiService } from './table.object.index.gui.service';

describe('TableObjectIndexGuiService', () => {
  let service: TableObjectIndexGuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableObjectIndexGuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
