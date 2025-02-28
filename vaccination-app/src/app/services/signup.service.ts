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

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  signupPatient(data: SignupRequest): Observable<any> {
    console.log('Sending signup request to:', `${this.baseUrl}/patient/signup`);
    console.log('Request data:', JSON.stringify(data, null, 2));
    return this.http.post(`${this.baseUrl}/patient/signup`, data).pipe(
      tap({
        error: (error) => console.error('Signup error:', error),
        next: (response) => console.log('Signup response:', response)
      })
    );
  }
} 