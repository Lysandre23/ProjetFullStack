import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatTabsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  users = [
    { email: 'superadmin@example.com', password: 'superadmin123', role: 'superadmin', redirectTo: '/manage-super-admins' },
    { email: 'admin@example.com', password: 'admin123', role: 'admin', redirectTo: '/manage-doctors' },
    { email: 'doctor@example.com', password: 'doctor123', role: 'doctor', redirectTo: '/search-person' },
    { email: 'patient@example.com', password: 'patient123', role: 'patient', redirectTo: '/reservations' },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  onSubmitPatient(): void {
    const user = this.users.find(
      u => u.email === this.email && u.password === this.password && u.role === 'patient'
    );

    if (user) {
      alert(`Connexion réussie en tant que ${user.role} !`);
      this.authService.setRole(user.role);
      this.router.navigate([user.redirectTo]);
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  }
  onSubmitMedecin(): void {
    const user = this.users.find(
      u => u.email === this.email &&
           u.password === this.password &&
           (u.role === 'doctor' || u.role === 'admin' || u.role === 'superadmin') // Vérifie les 3 types de rôles
    );
  
    if (user) {
      alert(`Connexion réussie en tant que ${user.role} !`);
      this.authService.setRole(user.role);
      this.router.navigate([user.redirectTo]);
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  }
  
  
}
