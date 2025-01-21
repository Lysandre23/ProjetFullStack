import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateVaccinationComponent } from './validate-vaccination.component';

describe('ValidateVaccinationComponent', () => {
  let component: ValidateVaccinationComponent;
  let fixture: ComponentFixture<ValidateVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateVaccinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
