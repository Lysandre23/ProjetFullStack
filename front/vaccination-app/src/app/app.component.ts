import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,VaccinationCenterListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-vaccinaton-center';
}
