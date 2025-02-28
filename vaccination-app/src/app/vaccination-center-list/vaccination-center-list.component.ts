import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

// Définition des interfaces
export interface VaccinationCenter {
  id: number;
  address: string;
  city: string;
  email: string;
  name: string;
  phone: string;
}

export interface Doctor {
  id: number;
  name: string;
  centerId: number; // Clé étrangère vers le centre
}

@Component({
  selector: 'app-vaccination-center-list',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgFor, CommonModule, NgIf, FormsModule, 
    MatFormFieldModule, MatInputModule, MatDatepickerModule, 
    MatNativeDateModule, MatSelectModule, MatOptionModule
  ],
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccinationCenterListComponent implements OnInit {
  // Liste des centres de vaccination
  centers: VaccinationCenter[] = [
    { id: 1, address: "Rue du pont",  city: "Nancy" , email: "email@popo.io", name: "Hopital Central 1", phone: "0123456789"},
    { id: 2, address: "Rue du pont", city: "Paris", email: "email@popo.io", name: "Hopital Central 2", phone: "0123456789"},
    { id: 3, address: "Rue du pont", city: "Dijon" , email: "email@popo.io", name: "Hopital Central 3", phone: "0123456789"}
  ];

  // Liste des médecins associés aux centres
  doctors: Doctor[] = [
    { id: 1, name: "Dr. Dupont", centerId: 1 },
    { id: 2, name: "Dr. Martin", centerId: 1 },
    { id: 3, name: "Dr. Morel", centerId: 2 },
    { id: 4, name: "Dr. Durand", centerId: 2 },
    { id: 5, name: "Dr. Bernard", centerId: 3 },
    { id: 6, name: "Dr. Leclerc", centerId: 3 }
  ];

  // Variables de sélection
  filteredCenters: VaccinationCenter[] = [];
  searchTerm: string = '';
  selectedCenter?: VaccinationCenter;
  selectedDoctors: Doctor[] = [];
  selectedDoctor?: Doctor;
  selectedDate: Date | null = null;
  appointmentConfirmed = false; // ✅ Pour afficher "Rendez-vous pris"

  ngOnInit(): void {
    this.filteredCenters = []; // Aucun centre affiché au début
  }

  // Filtrer les centres en fonction de la recherche
  filterCenters(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCenters = [];
    } else {
      this.filteredCenters = this.centers.filter(center =>
        center.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        center.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        center.city.toLowerCase().includes(this.searchTerm.toLowerCase())||
        center.email.toLowerCase().includes(this.searchTerm.toLowerCase())||
        center.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Sélectionner un centre et récupérer ses médecins
  select(center: VaccinationCenter): void {
    if (this.selectedCenter?.id === center.id) {
      this.selectedCenter = undefined;
      this.selectedDoctors = [];
      this.selectedDoctor = undefined;
    } else {
      this.selectedCenter = center;
      this.selectedDoctors = this.doctors.filter(doc => doc.centerId === center.id);
      this.selectedDoctor = undefined;
    }
    this.appointmentConfirmed = false; // Réinitialiser la confirmation
  }

  // Valider le rendez-vous
  validateAppointment(): void {
    if (this.selectedCenter && this.selectedDoctor && this.selectedDate) {
      this.appointmentConfirmed = true;
    } else {
      alert("Veuillez sélectionner un centre, un médecin et une date avant de valider.");
    }
  }
}
