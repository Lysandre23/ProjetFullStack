import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; // URL de l’API backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer tous les patients
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients`);
  }

  // 📌 Modifier un patient (PUT)
  updatePatient(patientId: number, patientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/patients/${patientId}`, patientData);
  }

  // 📌 Récupérer tous les centres de vaccination
  getCenters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/centers`);
  }

  // 📌 Récupérer les centres dans une ville spécifique
  getCentersByCity(city: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/centers/city/${city}`);
  }

  // 📌 Ajouter un centre de vaccination (POST)
  addCenter(centerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/centers`, centerData);
  }

  // 📌 Récupérer les spécialistes d’un centre donné
  getSpecialistsByCenter(centerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/centers/${centerId}/specialists`);
  }

  // 📌 Ajouter un spécialiste dans un centre (POST)
  addSpecialistToCenter(centerId: number, specialistData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/centers/${centerId}/specialist`, specialistData);
  }

  // 📌 Récupérer les spécialistes par spécialité
  getSpecialistsBySpecialty(specialty: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/specialists/specialty/${specialty}`);
  }

  // 📌 Récupérer les réservations d’un spécialiste
  getReservationsBySpecialist(specialistId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/specialists/${specialistId}/reservations`);
  }

  // 📌 Ajouter une réservation pour un patient et un spécialiste (POST)
  addReservation(specialistId: number, patientId: number, reservationData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/specialists/${specialistId}/reservations?patientId=${patientId}`, reservationData);
  }

  // 📌 Récupérer le spécialiste d’une réservation
  getSpecialistByReservation(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reservations/${reservationId}/specialist`);
  }

  // 📌 Récupérer les réservations d’un patient
  getReservationsByPatient(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients/${patientId}/reservations`);
  }

  // 📌 Valider la vaccination d'un patient (PUT)
  validateVaccination(patientId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/vaccination/validate/${patientId}`, {});
  }

  // 📌 Promouvoir un spécialiste en administrateur (PUT)
  promoteSpecialistToAdmin(specialistId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/specialists/${specialistId}/promote/admin`, {});
  }

  // 📌 Récupérer tous les administrateurs
  getAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admins`);
  }

  // 📌 Récupérer les super administrateurs
  getSuperAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admins/super`);
  }

  // Simule la récupération de l'ID du patient connecté (normalement via JWT ou API)
  getUserId(): number {
    return Number(localStorage.getItem('patientId')) || 1; // Valeur par défaut si l'ID n'est pas trouvé
  }

}
