import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Ajout de FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit(): void {
    if (this.email === 'admin@example.com' && this.password === 'password123') {
      alert('Connexion réussie !');
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  }
}
