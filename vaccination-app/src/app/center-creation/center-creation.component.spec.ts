import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CenterCreationComponent } from './center-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VaccinationService } from '../services/vaccination.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CenterCreationComponent', () => {
  let component: CenterCreationComponent;
  let fixture: ComponentFixture<CenterCreationComponent>;
  let vaccinationServiceSpy: jasmine.SpyObj<VaccinationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    vaccinationServiceSpy = jasmine.createSpyObj('VaccinationService', ['createCenter']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        CenterCreationComponent
      ],
      providers: [
        { provide: VaccinationService, useValue: vaccinationServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CenterCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.centerForm.get('name')?.value).toBe('');
    expect(component.centerForm.get('address')?.value).toBe('');
    expect(component.centerForm.get('city')?.value).toBe('');
    expect(component.centerForm.get('phone')?.value).toBe('');
    expect(component.centerForm.get('email')?.value).toBe('');
  });

  it('should validate required fields', () => {
    expect(component.centerForm.valid).toBeFalsy();
    component.centerForm.controls['name'].setValue('Test Center');
    component.centerForm.controls['address'].setValue('123 Test St');
    component.centerForm.controls['city'].setValue('Test City');
    component.centerForm.controls['phone'].setValue('1234567890');
    component.centerForm.controls['email'].setValue('test@test.com');
    expect(component.centerForm.valid).toBeTruthy();
  });

  it('should call createCenter service method on valid form submission', () => {
    const testCenter = {
      name: 'Test Center',
      address: '123 Test St',
      city: 'Test City',
      phone: '1234567890',
      email: 'test@test.com'
    };
    
    vaccinationServiceSpy.createCenter.and.returnValue(of({}));
    
    component.centerForm.setValue(testCenter);
    component.onSubmit();
    
    expect(vaccinationServiceSpy.createCenter).toHaveBeenCalledWith(testCenter);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/manage-centers']);
  });
}); 