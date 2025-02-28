import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Patient {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthdate: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = '/api/patients';

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching patients:', error);
        throw error;
      })
    );
  }

  searchPatients(searchTerm: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/search?term=${encodeURIComponent(searchTerm)}`).pipe(
      catchError(error => {
        console.error('Error searching patients:', error);
        throw error;
      })
    );
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching patient:', error);
        throw error;
      })
    );
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient).pipe(
      catchError(error => {
        console.error('Error updating patient:', error);
        throw error;
      })
    );
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting patient:', error);
        throw error;
      })
    );
  }
} 