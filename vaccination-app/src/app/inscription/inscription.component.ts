import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
<<<<<<< HEAD
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  standalone: true,
=======
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
>>>>>>> c4cfbf8924fdb2311811ca9fd6df7256ea96ccaa
  templateUrl: './inscription.component.html',
  imports: [
<<<<<<< HEAD
    ReactiveFormsModule, CommonModule, NgIf, FormsModule, 
    MatFormFieldModule, MatInputModule, MatDatepickerModule, 
    MatNativeDateModule, MatSelectModule, MatOptionModule,
    HttpClientModule
=======
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
>>>>>>> c4cfbf8924fdb2311811ca9fd6df7256ea96ccaa
  ],
  styleUrls: ['./inscription.component.css']
})
<<<<<<< HEAD
export class InscriptionComponent {
  inscriptionForm: FormGroup;
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
=======

export class InscriptionComponent implements OnInit {
  inscriptionPatientForm!: FormGroup;
  inscriptionMedecinForm!: FormGroup;
  centres = [
    { id: 1, nom: 'Centre Médical Paris' },
    { id: 2, nom: 'Clinique Lyon Sud' },
    { id: 3, nom: 'Hôpital de Marseille' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.inscriptionPatientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
>>>>>>> c4cfbf8924fdb2311811ca9fd6df7256ea96ccaa
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

<<<<<<< HEAD
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
=======
  onSubmitPatient() {
    if (this.inscriptionPatientForm.valid) {
      console.log('Inscription patient:', this.inscriptionPatientForm.value);
      // Ajouter la logique pour envoyer les données au backend
    }
  }

  onSubmitMedecin() {
    if (this.inscriptionMedecinForm.valid) {
      console.log('Inscription médecin:', this.inscriptionMedecinForm.value);
      // Ajouter la logique pour envoyer les données au backend
>>>>>>> c4cfbf8924fdb2311811ca9fd6df7256ea96ccaa
    }
  }
}

