import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [], // Ajout de NavbarComponent ici
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
