import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterTreelistComponent } from './parameter.treelist.component';

describe('ParameterTreelistComponent', () => {
  let component: ParameterTreelistComponent;
  let fixture: ComponentFixture<ParameterTreelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterTreelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterTreelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
