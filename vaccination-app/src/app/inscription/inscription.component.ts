import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true, // ✅ Si standalone est utilisé
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  imports: [
    ReactiveFormsModule, CommonModule, NgIf, FormsModule, 
    MatFormFieldModule, MatInputModule, MatDatepickerModule, 
    MatNativeDateModule, MatSelectModule, MatOptionModule
  ],
})
export class InscriptionComponent {
  inscriptionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inscriptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateNaissance: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      console.log("Inscription réussie :", this.inscriptionForm.value);
      alert("Inscription réussie !");
      this.inscriptionForm.reset(); // Réinitialise le formulaire
    } else {
      alert("Veuillez remplir correctement tous les champs.");
    }
  }
}

