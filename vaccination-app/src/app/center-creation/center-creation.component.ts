import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { VaccinationService } from '../services/vaccination.service';

@Component({
  selector: 'app-center-creation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './center-creation.component.html',
  styleUrls: ['./center-creation.component.css']
})
export class CenterCreationComponent {
  centerForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vaccinationService: VaccinationService,
    private router: Router
  ) {
    this.centerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.centerForm.valid) {
      this.isSubmitting = true;
      this.error = null;

      this.vaccinationService.createCenter(this.centerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/manage-centers']);
        },
        error: (error) => {
          console.error('Error creating center:', error);
          this.error = 'Erreur lors de la création du centre. Veuillez réessayer.';
          this.isSubmitting = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/manage-centers']);
  }
} 