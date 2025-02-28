import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  templateUrl: './inscription.component.html',
  imports: [
    ReactiveFormsModule, CommonModule, NgIf, FormsModule, 
    MatFormFieldModule, MatInputModule, MatDatepickerModule, 
    MatNativeDateModule, MatSelectModule, MatOptionModule,
  ],
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  inscriptionForm: FormGroup;
  inscriptionMedecinForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    this.inscriptionForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required],
      phone: ['']
    });

    this.inscriptionMedecinForm = this.fb.group({
      nom: ['', Validators.required],
      centre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      specialite: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      this.isLoading = true;
      this.error = null;

      const formValue = this.inscriptionForm.value;
      const signupData = {
        ...formValue,
        birthdate: formValue.birthdate // Send the Date object directly
      };

      this.signupService.signupPatient(signupData).subscribe({
        next: (response) => {
          this.isLoading = false;
          alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 409) {
            this.error = 'Cette adresse email est déjà utilisée.';
          } else {
            this.error = 'Une erreur est survenue lors de l\'inscription.';
            console.error('Erreur d\'inscription:', error);
          }
        }
      });
    } else {
      this.error = 'Veuillez remplir correctement tous les champs.';
    }
  }
}

