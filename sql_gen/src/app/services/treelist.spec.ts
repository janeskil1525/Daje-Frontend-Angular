import { TestBed } from '@angular/core/testing';

import { Treelist } from './treelist';

describe('Treelist', () => {
  let service: Treelist;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Treelist);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
