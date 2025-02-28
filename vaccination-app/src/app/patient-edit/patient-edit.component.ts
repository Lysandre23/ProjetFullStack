import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient, PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {
  patientForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  patientId = 0;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      phone: ['']
    });
  }

  ngOnInit() {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPatient();
  }

  loadPatient() {
    this.isLoading = true;
    this.error = null;

    this.patientService.getPatient(this.patientId).subscribe({
      next: (patient) => {
        // Format the date to YYYY-MM-DD for the input
        const birthdate = new Date(patient.birthdate).toISOString().split('T')[0];
        this.patientForm.patchValue({
          ...patient,
          birthdate
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading patient:', error);
        this.error = 'Erreur lors du chargement du patient';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.isLoading = true;
      this.error = null;

      const patientData = {
        ...this.patientForm.value,
        id: this.patientId
      };

      this.patientService.updatePatient(this.patientId, patientData).subscribe({
        next: () => {
          this.router.navigate(['/search-person']);
        },
        error: (error) => {
          console.error('Error updating patient:', error);
          this.error = 'Erreur lors de la mise à jour du patient';
          this.isLoading = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/search-person']);
  }
} 