import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

interface AuthResponse {
  id: number;
  email: string;
  role?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<number | null>(null);
  private baseUrl = '/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private isSuperAdminSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();
  isSuperAdmin$ = this.isSuperAdminSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    // Restore auth state from localStorage
    const savedRole = localStorage.getItem('role');
    const savedUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    if (savedRole) {
      this.role.next(savedRole);
      this.isAuthenticatedSubject.next(true);
    }
    if (savedUserId) {
      this.userId.next(Number(savedUserId));
    }

    // Check privileges on service initialization if user is logged in
    if (this.isLoggedIn()) {
      this.checkAdminPrivileges();
    }
  }

  private checkAdminPrivileges() {
    const specialistId = this.getUserId();
    if (specialistId) {
      // Check admin privileges
      this.http.get<boolean>(`/api/specialists/admin/${specialistId}`).subscribe({
        next: (isAdmin) => this.isAdminSubject.next(isAdmin),
        error: (error) => console.error('Error checking admin privileges:', error)
      });
      
      // Check super admin privileges
      this.http.get<boolean>(`/api/specialists/superadmin/${specialistId}`).subscribe({
        next: (isSuperAdmin) => this.isSuperAdminSubject.next(isSuperAdmin),
        error: (error) => console.error('Error checking super admin privileges:', error)
      });
    }
  }

  signInPatient(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/patient/signin`, { email, password }).pipe(
      tap(response => {
        this.role.next('patient');
        this.userId.next(response.id);
        localStorage.setItem('role', 'patient');
        localStorage.setItem('userId', response.id.toString());
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        this.isAuthenticatedSubject.next(true);
        this.checkAdminPrivileges();
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
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        this.isAuthenticatedSubject.next(true);
        this.checkAdminPrivileges();
      })
    );
  }

  setRole(role: string): void {
    this.role.next(role);
    localStorage.setItem('role', role);
    this.isAuthenticatedSubject.next(true);
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
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    this.isSuperAdminSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.role.getValue() !== null;
  }

  isSuperAdmin(): boolean {
    return this.isSuperAdminSubject.value;
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    this.isSuperAdminSubject.next(false);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('userRole', response.role);
          this.isAuthenticatedSubject.next(true);
          this.checkAdminPrivileges();
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}
