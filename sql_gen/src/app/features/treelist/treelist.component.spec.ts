import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTreelist } from './treelist.coponent';

describe('ObjectTreelist', () => {
  let component: ObjectTreelist;
  let fixture: ComponentFixture<ObjectTreelist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectTreelist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectTreelist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
