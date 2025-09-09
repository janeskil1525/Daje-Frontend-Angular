import { TestBed } from '@angular/core/testing';

import { Menulist } from './menulist';

describe('Menulist', () => {
  let service: Menulist;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Menulist);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
