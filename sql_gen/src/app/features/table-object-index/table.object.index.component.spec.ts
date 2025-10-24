import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableObjectIndexComponent } from './table.object.index.component';

describe('TableObjectIndexComponent', () => {
  let component: TableObjectIndexComponent;
  let fixture: ComponentFixture<TableObjectIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableObjectIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableObjectIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
