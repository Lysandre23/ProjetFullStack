import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import du FormsModule
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule], // Combinaison des modules nécessaires
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css'],
})
export class ManageReservationsComponent implements OnInit {
  reservations: any[] = [];
  filteredReservations: any[] = [];
  filterDate: string = '';
  filterStatus: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.apiService.getReservations().subscribe((data) => {
      this.reservations = data;
      this.filteredReservations = [...this.reservations]; // Initialisation du filtrage
    });
  }

  applyFilters(): void {
    this.filteredReservations = this.reservations.filter(reservation => {
      const matchesDate = this.filterDate ? reservation.date === this.filterDate : true;
      const matchesStatus = this.filterStatus ? reservation.status === this.filterStatus : true;
      return matchesDate && matchesStatus;
    });
  }

  onValidate(id: number): void {
    const reservation = this.reservations.find(r => r.id === id);
    if (reservation) {
      reservation.status = 'validée';
      this.apiService.createReservation(reservation).subscribe(() => {
        alert('Réservation validée');
        this.fetchReservations(); // Rafraîchissement des données
      });
    }
  }

  onCancel(id: number): void {
    const reservation = this.reservations.find(r => r.id === id);
    if (reservation) {
      reservation.status = 'annulée';
      this.apiService.createReservation(reservation).subscribe(() => {
        alert('Réservation annulée');
        this.fetchReservations(); // Rafraîchissement des données
      });
    }
  }
}
