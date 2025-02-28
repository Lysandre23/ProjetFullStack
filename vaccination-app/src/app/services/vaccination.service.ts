import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { Doctor } from '../vaccination-center-list/vaccination-center-list.component';

// Interface pour la réservation
export interface Reservation {
  id?: number;
  date: Date;
  done?: boolean;
  specialist: {
    id: number;
  };
  patient: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  private apiUrl = '/api/centers'; // URL relative pour utiliser le proxy
  private reservationUrl = '/api/reservations'; // URL pour les réservations

  constructor(private http: HttpClient) {}

  // Récupérer tous les centres de vaccination
  getAllCenters(): Observable<VaccinationCenter[]> {
    return this.http.get<VaccinationCenter[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des centres:', error);
        throw error;
      })
    );
  }

  // Récupérer les médecins d'un centre
  getDoctorsByCenter(centerId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/${centerId}/specialists`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des médecins:', error);
        throw error;
      })
    );
  }

  // Créer une nouvelle réservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.reservationUrl, reservation).pipe(
      catchError(error => {
        console.error('Erreur lors de la création de la réservation:', error);
        throw error;
      })
    );
  }

  // Récupérer les réservations d'un médecin
  getReservationsByDoctor(doctorId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`/api/specialists/${doctorId}/reservations`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des réservations:', error);
        throw error;
      })
    );
  }

  // Récupérer les réservations d'un patient
  getReservationsByPatient(patientId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.reservationUrl}?patientId=${patientId}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des réservations du patient:', error);
        throw error;
      })
    );
  }

  // Supprimer une réservation
  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.reservationUrl}/${reservationId}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression de la réservation:', error);
        throw error;
      })
    );
  }

  // Marquer une réservation comme effectuée
  markReservationAsDone(reservationId: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.reservationUrl}/${reservationId}/done`, {}).pipe(
      catchError(error => {
        console.error('Erreur lors du marquage de la réservation comme effectuée:', error);
        throw error;
      })
    );
  }
}
