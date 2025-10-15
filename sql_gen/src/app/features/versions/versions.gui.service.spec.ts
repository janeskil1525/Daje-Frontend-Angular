import { TestBed } from '@angular/core/testing';

import { VersionsGuiService } from './versions.gui.service';

describe('VersionsGuiService', () => {
  let service: VersionsGuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersionsGuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
