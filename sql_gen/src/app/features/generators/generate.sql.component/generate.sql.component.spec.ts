import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSqlComponent } from './generate.sql.component';

describe('GenerateSqlComponent', () => {
  let component: GenerateSqlComponent;
  let fixture: ComponentFixture<GenerateSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateSqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
