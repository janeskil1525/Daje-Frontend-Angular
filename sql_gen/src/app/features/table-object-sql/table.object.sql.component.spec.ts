import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableObjectSqlComponent } from './table.object.sql.component';

describe('TableObjectSqlComponent', () => {
  let component: TableObjectSqlComponent;
  let fixture: ComponentFixture<TableObjectSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableObjectSqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableObjectSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
