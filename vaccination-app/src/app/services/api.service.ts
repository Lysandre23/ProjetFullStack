import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  /** ----------------- Patients ----------------- */
  getPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patients`);
  }

  getPatientByLastName(lastname: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/patients?lastname=${lastname}`);
  }

  createPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients`, patientData);
  }

  updatePatient(id: number, patientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/patients/${id}`, patientData);
  }

  /** ----------------- Spécialistes ----------------- */
  getSpecialists(): Observable<any> {
    return this.http.get(`${this.baseUrl}/specialists`);
  }

  getSpecialistsBySpecialty(specialty: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/specialists/specialty/${specialty}`);
  }

  createSpecialist(specialistData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/specialists`, specialistData);
  }

  /** ----------------- Réservations ----------------- */
  getReservations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reservations`);
  }

  getReservationBySpecialist(specialistId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reservations/${specialistId}/specialist`);
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, reservationData);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reservations/${id}`);
  }

  /** ----------------- Centres ----------------- */
  getCenters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/centers`);
  }

  getCentersByCity(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/centers/city/${city}`);
  }

  createCenter(centerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/centers`, centerData);
  }

  /** ----------------- Administrateurs ----------------- */
  getAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admins`);
  }

  getSuperAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admins/super`);
  }

  createAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admins`, adminData);
  }
}
