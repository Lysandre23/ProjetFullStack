import { Component } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  reservations = [
    { id: 1, nom: 'Dupont', prenom: 'Jean', date: '2025-03-10', lieu: 'Centre Paris', medecin: 'Dr. Lefebvre' },
    { id: 2, nom: 'Martin', prenom: 'Sophie', date: '2025-03-12', lieu: 'Centre Lyon', medecin: 'Dr. Moreau' },
    { id: 3, nom: 'Durand', prenom: 'Paul', date: '2025-03-15', lieu: 'Centre Marseille', medecin: 'Dr. Dubois' }
  ];

  annulerReservation(id: number) {
    this.reservations = this.reservations.filter(res => res.id !== id);
  }
}
