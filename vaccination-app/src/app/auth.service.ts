import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role: string | null = null;

  setRole(role: string): void {
    this.role = role;
  }

  getRole(): string | null {
    return this.role;
  }

  clearRole(): void {
    this.role = null;
  }
}
