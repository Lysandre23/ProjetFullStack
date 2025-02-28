import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  imports: [MatToolbarModule, MatButtonModule, RouterModule, CommonModule],
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: { id: number; nom: string; prenom: string; date: string; lieu: string; medecin: string }[] = [];
  patientId: number = 1; // ID du patient pour le test
  useMockData: boolean = true; // Passer à false pour utiliser le backend

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    if (this.useMockData) {
      this.loadMockReservations();
    } else {
      this.loadReservationsFromApi();
    }
  }

  // 📌 Mode TEST : Chargement des réservations statiques
  loadMockReservations() {
    this.reservations = [
      { id: 1, nom: 'Dupont', prenom: 'Jean', date: '2025-03-10', lieu: 'Centre Paris', medecin: 'Dr. Lefebvre' },
      { id: 2, nom: 'Martin', prenom: 'Sophie', date: '2025-03-12', lieu: 'Centre Lyon', medecin: 'Dr. Moreau' },
      { id: 3, nom: 'Durand', prenom: 'Paul', date: '2025-03-15', lieu: 'Centre Marseille', medecin: 'Dr. Dubois' }
    ];
  }

  // 📌 Mode API : Chargement des réservations depuis le backend
  loadReservationsFromApi() {
    this.apiService.getReservationsByPatient(this.patientId).subscribe(data => {
      this.reservations = data.map(res => ({
        id: res.id || 0,
        nom: res.patient?.lastname || "Inconnu",
        prenom: res.patient?.firstname || "Inconnu",
        date: res.date,
        lieu: res.center.name,
        medecin: `Dr. ${res.specialist.name}`
      }));
    }, error => {
      console.error("Erreur lors de la récupération des réservations :", error);
    });
  }
}
