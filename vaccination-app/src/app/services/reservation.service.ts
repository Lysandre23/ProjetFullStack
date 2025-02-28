import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Specialist {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  admin: boolean;
  superAdmin: boolean;
}

export interface Patient {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthdate: Date;
}

export interface Reservation {
  id: number;
  date: Date;
  done: boolean;
  specialist: Specialist;
  patient: Patient;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = '/api/reservations';

  constructor(private http: HttpClient) {}

  getReservationsByPatient(patientId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`/api/patients/${patientId}/reservations`);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  markReservationAsDone(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/${id}/done`, {});
  }
} 