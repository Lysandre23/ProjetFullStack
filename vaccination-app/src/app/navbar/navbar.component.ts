import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common'; // Nécessaire pour *ngIf et autres directives Angular

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, CommonModule], // Ajout des modules nécessaires
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  role: string | null = null;

  constructor(public authService: AuthService) { // Rendre authService public pour le template
    this.role = this.authService.getRole(); // Obtenez le rôle actuel
  }

  logout(): void {
    this.authService.logout();
    // Redirection vers la page de connexion ou autre traitement
  }
}