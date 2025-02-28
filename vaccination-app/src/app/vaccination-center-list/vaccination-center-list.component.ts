import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { VaccinationService } from '../services/vaccination.service';
import { VaccinationCenter } from '../model/vaccination-center.model';

// Définition de l'interface Doctor
export interface Doctor {
  id: number;
  name: string;
  centerId: number;
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
  // Centres statiques
  centers: VaccinationCenter[] = [
    { id: 1, address: "Rue du pont",  city: "Nancy", email: "email@popo.io", name: "Hopital Central 1", phone: "0123456789" },
    { id: 2, address: "Rue du pont", city: "Paris", email: "email@popo.io", name: "Hopital Central 2", phone: "0123456789" },
    { id: 3, address: "Rue du pont", city: "Dijon", email: "email@popo.io", name: "Hopital Central 3", phone: "0123456789" }
  ];

  filteredCenters: VaccinationCenter[] = [];
  doctors: Doctor[] = [
    { id: 1, name: "Dr. Dupont", centerId: 1 },
    { id: 2, name: "Dr. Martin", centerId: 1 },
    { id: 3, name: "Dr. Morel", centerId: 2 },
    { id: 4, name: "Dr. Durand", centerId: 2 },
    { id: 5, name: "Dr. Bernard", centerId: 3 },
    { id: 6, name: "Dr. Leclerc", centerId: 3 }
  ];

  searchTerm: string = '';
  selectedCenter?: VaccinationCenter;
  selectedDoctors: Doctor[] = [];
  selectedDoctor?: Doctor;
  selectedDate: Date | null = null;
  appointmentConfirmed = false;

  constructor(private vaccinationService: VaccinationService) {}

  ngOnInit(): void {
    this.loadCenters();
  }

  // Charger les centres depuis l'API et les fusionner avec les centres statiques
  loadCenters(): void {
    this.vaccinationService.getAllCenters().subscribe({
      next: (data) => {
        // Fusionner les centres statiques et ceux de la base de données
        const mergedCenters = [...this.centers, ...data];

        // Supprimer les doublons basés sur l'ID
        this.centers = mergedCenters.filter((center, index, self) =>
          index === self.findIndex((c) => c.id === center.id)
        );

        // Mettre à jour la liste filtrée
        this.filteredCenters = this.centers;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des centres:', err);
      }
    });
  }

  // Filtrer les centres en fonction de la recherche
  filterCenters(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCenters = this.centers;
    } else {
      this.filteredCenters = this.centers.filter(center =>
        center.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        center.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        center.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        center.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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
    this.appointmentConfirmed = false;
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
