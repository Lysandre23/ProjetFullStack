import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  imports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./inscription.component.css']
})

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateNaissance: ['', Validators.required]
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
    }
  }
}




