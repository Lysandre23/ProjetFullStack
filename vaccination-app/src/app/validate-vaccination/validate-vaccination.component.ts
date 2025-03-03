import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api.service';
import { ReservationService, Reservation } from '../services/reservation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-validate-vaccination',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatTableModule], 
  templateUrl: './validate-vaccination.component.html',
  styleUrls: ['./validate-vaccination.component.css'],
})
export class ValidateVaccinationComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'date', 'done','actions'];
  persons: any[] = [];
  filteredPersons: any[] = [];
  searchTerm: string = '';
  reservations: Reservation[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private reservationService: ReservationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  fetchPersons(): void {
    this.apiService.getPatients().subscribe((data) => {
      this.persons = data.map((p: any) => ({
        ...p,
        status: p.status || 'Non Vaccinée' // Définit un statut par défaut si manquant
      }));
      this.filteredPersons = [...this.persons];
    });
  }

  loadReservations() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.error = 'Utilisateur non connecté';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.reservationService.getReservationsBySpecialist(userId).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des réservations:', error);
        this.error = 'Erreur lors du chargement des réservations';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPersons = this.persons.filter(person => 
      person.name.toLowerCase().includes(term) || 
      person.email.toLowerCase().includes(term)
    );
  }

  onValidate(id: number): void {
      this.reservationService.markReservationAsDone(id).subscribe(() => {
        this.loadReservations();
      });
  }

  onCancel(id: number): void {
      this.reservationService.deleteReservation(id).subscribe(() => {
        this.loadReservations();
      });
  }
}
