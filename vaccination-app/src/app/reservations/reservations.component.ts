import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReservationService, Reservation } from '../services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.error = 'Utilisateur non connecté';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.reservationService.getReservationsByPatient(userId).subscribe({
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

  deleteReservation(id: number) {
    if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          this.loadReservations(); // Reload the list after deletion
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.error = 'Erreur lors de la suppression de la réservation';
        }
      });
    }
  }
}
