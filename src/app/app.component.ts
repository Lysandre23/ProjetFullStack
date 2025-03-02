import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientService } from './services/patient.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'vaccination-app';

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
    });
  }

  fetchPatient(id: string) {
    const patient = this.patientService.getPatient(id);
    console.log(patient);
  }
} 