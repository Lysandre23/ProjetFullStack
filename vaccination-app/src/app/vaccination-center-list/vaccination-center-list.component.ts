import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VaccinationCenter } from '../vaccination-center';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vaccination-center-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, HttpClientModule, FormsModule],
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.css']
})
export class VaccinationCenterListComponent implements OnInit {
  centers: VaccinationCenter[] = [
    { id: 1, name: "Hopital Central 1", address: "Rue du pont", postalCode: "54000", city: "Nancy" },
    { id: 2, name: "Hopital Central 2", address: "Rue du pont", postalCode: "75000", city: "Paris" },
    { id: 3, name: "Hopital Central 3", address: "Rue du pont", postalCode: "21000", city: "Dijon" }
  ];
  filteredCenters: VaccinationCenter[] = [];
  searchTerm: string = '';
  selectedCenter?: VaccinationCenter;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.filteredCenters = []; // Initialement, aucune liste n'est affichée
  }
  

  fetchVaccinationCenters(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.http.get<VaccinationCenter[]>('http://localhost:8080/centers')
      .subscribe({
        next: (data) => {
          this.centers = [...this.centers, ...data];
          this.filteredCenters = this.centers;
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
    if (this.selectedCenter?.id === center.id) {
      this.selectedCenter = undefined; // Désélectionner si c'est déjà le centre sélectionné
    } else {
      this.selectedCenter = center; // Sélectionner le centre cliqué
    }
  }

  filterCenters(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCenters = []; // Vide la liste si aucun texte n'est saisi
    } else {
      this.filteredCenters = this.centers.filter(center =>
        center.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        center.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        center.city.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
}
