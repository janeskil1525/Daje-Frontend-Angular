import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableObjectViewComponent } from './table.object.view.component';

describe('TableObjectViewComponent', () => {
  let component: TableObjectViewComponent;
  let fixture: ComponentFixture<TableObjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableObjectViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableObjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
