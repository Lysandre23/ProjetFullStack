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
import { ApiService } from '../services/api.service';
import { AuthService } from '../auth.service';
import { ReservationService } from '../services/reservation.service';

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
  isDoctorsLoading = false;
  error: string | null = null;
  doctorsError: string | null = null;
  selectedDoctors: Doctor[] = [];
  isCreatingReservation = false;
  
  searchTerm: string = '';
  selectedCenter?: VaccinationCenter;
  selectedDoctor?: Doctor;
  selectedDate: Date | null = null;
  appointmentConfirmed = false;

  constructor(
    private vaccinationService: VaccinationService,
    private apiService: ApiService,
    private authService: AuthService,
    private reservationService: ReservationService,
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
        console.log('Centers loaded:', this.centers);
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

  // Charger les médecins d'un centre
  loadDoctors(centerId: number): void {
    this.isDoctorsLoading = true;
    this.doctorsError = null;
    this.selectedDoctors = [];
    this.cdr.detectChanges();

    this.vaccinationService.getDoctorsByCenter(centerId).subscribe({
      next: (doctors) => {
        this.selectedDoctors = doctors;
        this.isDoctorsLoading = false;
        console.log('Doctors loaded:', doctors);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des médecins:', err);
        this.doctorsError = 'Erreur lors du chargement des médecins';
        this.isDoctorsLoading = false;
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
      this.loadDoctors(center.id);
      this.selectedDoctor = undefined;
    }
    this.appointmentConfirmed = false;
  }

  // Valider le rendez-vous
  validateAppointment() {
    if (!this.selectedCenter || !this.selectedDoctor || !this.selectedDate) {
      this.error = 'Veuillez sélectionner un centre, un médecin et une date';
      return;
    }

    this.isCreatingReservation = true;
    const userId = this.authService.getUserId();
    
    if (!userId) {
      this.error = 'Utilisateur non connecté';
      this.isCreatingReservation = false;
      return;
    }

    this.reservationService.createReservation(
      this.selectedDoctor.id,
      userId,
      this.selectedDate
    ).subscribe({
      next: () => {
        this.isCreatingReservation = false;
        this.appointmentConfirmed = true;
        // Optionally, reset the form or redirect
      },
      error: (error) => {
        console.error('Erreur lors de la création de la réservation:', error);
        this.error = 'Erreur lors de la création de la réservation';
        this.isCreatingReservation = false;
      }
    });
  }
}
