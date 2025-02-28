import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface AuthResponse {
  id: number;
  email: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<number | null>(null);
  private baseUrl = '/api/auth';

  constructor(private router: Router, private http: HttpClient) {
    // Restore auth state from localStorage
    const savedRole = localStorage.getItem('role');
    const savedUserId = localStorage.getItem('userId');
    if (savedRole) this.role.next(savedRole);
    if (savedUserId) this.userId.next(Number(savedUserId));
  }

  signInPatient(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/patient/signin`, { email, password }).pipe(
      tap(response => {
        this.role.next('patient');
        this.userId.next(response.id);
        localStorage.setItem('role', 'patient');
        localStorage.setItem('userId', response.id.toString());
      })
    );
  }

  signInSpecialist(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/specialist/signin`, { email, password }).pipe(
      tap(response => {
        const role = response.role || 'doctor';
        this.role.next(role);
        this.userId.next(response.id);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', response.id.toString());
      })
    );
  }

  setRole(role: string): void {
    this.role.next(role);
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return this.role.getValue();
  }

  getUserId(): number | null {
    return this.userId.getValue();
  }

  clearRole(): void {
    this.role.next(null);
    this.userId.next(null);
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return this.role.getValue() !== null;
  }

  isSuperAdmin(): boolean {
    return this.role.getValue() === 'superadmin';
  }

  isAdmin(): boolean {
    return this.role.getValue() === 'admin';
  }

  isMedecin(): boolean {
    return this.role.getValue() === 'doctor';
  }

  isPatient(): boolean {
    return this.role.getValue() === 'patient';
  }

  logout(): void {
    this.clearRole();
    this.router.navigate(['/login']);
  }
}
