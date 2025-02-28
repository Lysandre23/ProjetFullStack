import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  private apiUrl = 'http://localhost:8080/api/public/centers'; // URL de l'API des centres
  private reservationUrl = 'http://localhost:8080/api/public/reservations'; // URL des réservations

  private useMockData = true; // Passe à false pour utiliser l'API

  private mockCenters = [
    { id: 1, name: 'Centre A', address: '123 Rue Principale', city: 'Paris', email: 'contact@centreA.fr', phone: '0102030405' },
    { id: 2, name: 'Centre B', address: '456 Avenue République', city: 'Lyon', email: 'contact@centreB.fr', phone: '0203040506' }
  ];

  private mockReservations: any[] = [];

  constructor(private http: HttpClient) {}

  // Récupérer les centres de vaccination
  getCenters(): Observable<any[]> {
    if (this.useMockData) {
      return of(this.mockCenters); // Mode test avec données locales
    }
    return this.http.get<any[]>(this.apiUrl); // Mode API
  }

  // Ajouter une réservation
  addReservation(reservation: any): Observable<any> {
    if (this.useMockData) {
      this.mockReservations.push(reservation);
      console.log('Réservation enregistrée (local) :', reservation);
      return of(reservation);
    }
    return this.http.post(this.reservationUrl, reservation); // Envoi à l'API
  }
}
