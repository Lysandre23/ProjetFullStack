import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSuperAdminsComponent } from './manage-super-admins.component';

describe('ManageSuperAdminsComponent', () => {
  let component: ManageSuperAdminsComponent;
  let fixture: ComponentFixture<ManageSuperAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSuperAdminsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSuperAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
