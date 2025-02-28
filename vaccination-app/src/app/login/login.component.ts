import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatTabsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmitPatient(): void {
    this.isLoading = true;
    this.error = '';
    
    this.authService.signInPatient(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/reservations']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Email ou mot de passe incorrect';
        console.error('Erreur de connexion:', error);
      }
    });
  }

  onSubmitMedecin(): void {
    this.isLoading = true;
    this.error = '';
    
    this.authService.signInSpecialist(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (this.authService.isSuperAdmin()) {
          this.router.navigate(['/manage-super-admins']);
        } else if (this.authService.isAdmin()) {
          this.router.navigate(['/manage-doctors']);
        } else {
          this.router.navigate(['/search-person']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Email ou mot de passe incorrect';
        console.error('Erreur de connexion:', error);
      }
    });
  }
}
