import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableObjectComponent } from './table-object.component';

describe('TableObjectComponent', () => {
  let component: TableObjectComponent;
  let fixture: ComponentFixture<TableObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableObjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
