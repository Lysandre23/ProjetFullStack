import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
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
    MatNativeDateModule, MatSelectModule, MatOptionModule,
    MatButtonModule
  ],
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.css']
})
export class VaccinationCenterListComponent implements OnInit {
  centers: VaccinationCenter[] = [];
  filteredCenters: VaccinationCenter[] = [];
  isLoading = false;
  error: string | null = null;
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

  constructor(
    private vaccinationService: VaccinationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCenters();
  }

  // Charger les centres depuis l'API
  loadCenters(): void {
    this.isLoading = true;
    this.error = null;
    this.cdr.detectChanges();
    
    this.vaccinationService.getAllCenters().subscribe({
      next: (data) => {
        this.centers = data;
        this.filteredCenters = this.centers;
        this.isLoading = false;
        console.log('Centers loaded:', this.centers); // Debug log
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des centres:', err);
        this.error = 'Erreur lors du chargement des centres';
        this.isLoading = false;
        this.cdr.detectChanges();
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
