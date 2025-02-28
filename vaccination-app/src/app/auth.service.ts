import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role: string | null = null;

  constructor(private router: Router) {}

  setRole(role: string): void {
    this.role = role;
  }

  getRole(): string | null {
    return this.role;
  }

  clearRole(): void {
    this.role = null;
  }

  isLoggedIn(): boolean {
    return this.role !== null;
  }

  isSuperAdmin(): boolean {
    return this.role === 'superadmin';
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isMedecin(): boolean {
    return this.role === 'doctor';
  }

  isPatient(): boolean {
    return this.role === 'patient';
  }

  logout(): void {
    this.clearRole();
    // Redirection vers la page de connexion après déconnexion
    this.router.navigate(['/login']);
  }
}
