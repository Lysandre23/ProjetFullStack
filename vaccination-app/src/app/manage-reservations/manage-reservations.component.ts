import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import du FormsModule

@Component({
  selector: 'app-manage-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule], // Combinaison des modules nécessaires
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css'],
})
export class ManageReservationsComponent {
  reservations = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2025-01-25', status: 'en attente' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2025-01-26', status: 'validée' },
    { id: 3, name: 'Sam Brown', email: 'sam@example.com', date: '2025-01-27', status: 'annulée' },
  ];

  filteredReservations = [...this.reservations];
  filterDate: string = '';
  filterStatus: string = '';

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
      this.applyFilters();
    }
  }

  onCancel(id: number): void {
    const reservation = this.reservations.find(r => r.id === id);
    if (reservation) {
      reservation.status = 'annulée';
      this.applyFilters();
    }
  }
}