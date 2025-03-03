import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CenterService, Center } from '../services/center.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  standalone: true,
  imports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit {
  inscriptionPatientForm!: FormGroup;
  inscriptionMedecinForm!: FormGroup;
  isLoading = false;
  error: string | null = null;
  centers: Center[] = [];
  loading: boolean = false;
  isAuthenticated = false;
  specialties = [
    'Généraliste',
    'Pédiatre',
    'Gériatre',
    'Infectiologue',
    'Pneumologue',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private centerService: CenterService,
    private router: Router,
    private authService: AuthService
  ) {
    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // Subscribe to authentication status changes
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.router.navigate(['/']);
        }
      }
    );

    this.inscriptionPatientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateNaissance: ['', Validators.required],
      telephone: ['']
    });

    this.inscriptionMedecinForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      centerId: ['', Validators.required],
      specialty: ['', Validators.required],
      phone: ['']
    });

    this.loadCenters();
  }

  loadCenters() {
    this.loading = true;
    this.error = null;
    this.centerService.getAllCenters().subscribe({
      next: (centers) => {
        this.centers = centers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading centers:', error);
        this.error = 'Failed to load vaccination centers. Please try again later.';
        this.loading = false;
      }
    });
  }

  onSubmitPatient() {
    if (this.inscriptionPatientForm.valid) {
      this.isLoading = true;
      this.error = null;

      const formValue = this.inscriptionPatientForm.value;
      const signupData = {
        firstname: formValue.prenom,
        lastname: formValue.nom,
        email: formValue.email,
        password: formValue.password,
        birthdate: formValue.dateNaissance,
        phone: formValue.telephone || ''
      };

      this.signupService.signupPatient(signupData).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
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

  onSubmitMedecin() {
    if (this.inscriptionMedecinForm.valid) {
      this.isLoading = true;
      this.error = null;

      const formValue = this.inscriptionMedecinForm.value;
      const signupData = {
        firstname: formValue.prenom,
        lastname: formValue.nom,
        email: formValue.email,
        password: formValue.password,
        centerId: formValue.centerId,
        specialty: formValue.specialty,
        phone: formValue.phone || ''
      };

      this.signupService.signupSpecialist(signupData).subscribe({
        next: () => {
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

  toggleForm(event: MatTabChangeEvent) {
    this.error = null;
    this.isLoading = false;
  }
}