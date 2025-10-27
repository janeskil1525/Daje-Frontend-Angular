import { TestBed } from '@angular/core/testing';

import { TableObjectViewGuiService } from './table.object.view.gui.service';

describe('TableObjectViewGuiService', () => {
  let service: TableObjectViewGuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableObjectViewGuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
