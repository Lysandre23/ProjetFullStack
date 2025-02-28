import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientEditComponent } from './patient-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { of } from 'rxjs';

describe('PatientEditComponent', () => {
  let component: PatientEditComponent;
  let fixture: ComponentFixture<PatientEditComponent>;
  let patientServiceSpy: jasmine.SpyObj<PatientService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPatient = {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    birthdate: '1990-01-01',
    phone: '1234567890'
  };

  beforeEach(async () => {
    patientServiceSpy = jasmine.createSpyObj('PatientService', ['getPatient', 'updatePatient']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    patientServiceSpy.getPatient.and.returnValue(of(mockPatient));
    patientServiceSpy.updatePatient.and.returnValue(of(mockPatient));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        PatientEditComponent
      ],
      providers: [
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load patient data on init', () => {
    expect(patientServiceSpy.getPatient).toHaveBeenCalledWith(1);
    expect(component.patientForm.get('firstname')?.value).toBe(mockPatient.firstname);
    expect(component.patientForm.get('lastname')?.value).toBe(mockPatient.lastname);
    expect(component.patientForm.get('email')?.value).toBe(mockPatient.email);
  });

  it('should update patient when form is valid', () => {
    component.patientForm.patchValue(mockPatient);
    component.onSubmit();
    
    expect(patientServiceSpy.updatePatient).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/search-person']);
  });

  it('should navigate back on cancel', () => {
    component.onCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/search-person']);
  });
}); 