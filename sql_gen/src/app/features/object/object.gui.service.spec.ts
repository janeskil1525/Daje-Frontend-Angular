import { TestBed } from '@angular/core/testing';

import { ObjectGuiService } from './object.gui.service';

describe('TableGuiService', () => {
  let service: ObjectGuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectGuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
