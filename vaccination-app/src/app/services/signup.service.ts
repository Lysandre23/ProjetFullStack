import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface SignupRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  phone?: string;
}

interface PatientSignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  phone: string;
}

interface SpecialistSignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  centerId: number;
  specialty: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  signupPatient(data: PatientSignupData): Observable<any> {
    console.log('Sending signup request:', data);
    return this.http.post(`${this.baseUrl}/patient/signup`, data);
  }

  signupSpecialist(data: SpecialistSignupData): Observable<any> {
    return this.http.post(`${this.baseUrl}/specialist/signup`, data);
  }
} 