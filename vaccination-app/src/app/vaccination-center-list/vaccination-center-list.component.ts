import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VaccinationCenter } from '../vaccination-center';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vaccination-center-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, HttpClientModule],
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.css']
})
export class VaccinationCenterListComponent implements OnInit {
  centers: VaccinationCenter[] = [
    { id: 1, name: "Hopital Central 1", address: "Rue du pont", postalCode: "54000", city: "Nancy" },
    { id: 2, name: "Hopital Central 2", address: "Rue du pont", postalCode: "75000", city: "Paris" },
    { id: 3, name: "Hopital Central 3", address: "Rue du pont", postalCode: "21000", city: "Dijon" }
  ];
  selectedCenter?: VaccinationCenter;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchVaccinationCenters();
  }

  fetchVaccinationCenters(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.http.get<VaccinationCenter[]>('http://localhost:8080/centers')
      .subscribe({
        next: (data) => {
          // Ajoute les données récupérées à la liste existante
          this.centers = [...this.centers, ...data];
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Une erreur est survenue lors de la récupération des centres de vaccination.';
          console.error(error);
          this.isLoading = false;
        }
      });
  }

  select(center: VaccinationCenter): void {
    this.selectedCenter = center;
  }
}
