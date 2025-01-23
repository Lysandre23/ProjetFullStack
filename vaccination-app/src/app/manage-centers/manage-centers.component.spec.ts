import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCentersComponent } from './manage-centers.component';

describe('ManageCentersComponent', () => {
  let component: ManageCentersComponent;
  let fixture: ComponentFixture<ManageCentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCentersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
