import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { ApiService } from '../services/api.service';

interface VaccinationCenter {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  city: string;
}

@Component({
  selector: 'app-vaccination-center-list',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgFor, CommonModule, NgIf, FormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccinationCenterListComponent implements OnInit {
  centers: VaccinationCenter[] = [];
  filteredCenters: VaccinationCenter[] = [];
  searchTerm: string = '';
  selectedCenter?: VaccinationCenter;
  isLoading = false;
  errorMessage: string | null = null;
  selectedDate: Date | null = null; // Propriété pour la date sélectionnée

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchVaccinationCenters();
  }

  fetchVaccinationCenters(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.getCenters().subscribe({
      next: (data) => {
        this.centers = data;
        this.filteredCenters = [...this.centers];
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
    this.selectedCenter = this.selectedCenter?.id === center.id ? undefined : center;
  }

  getButtonClass(center: VaccinationCenter): string {
    return this.selectedCenter?.id === center.id ? 'selected' : '';
  }

  filterCenters(): void {
    this.filteredCenters = this.searchTerm.trim()
      ? this.centers.filter(center =>
          center.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          center.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          center.city.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : [...this.centers];
  }

  onDateSelected(): void {
    if (this.selectedDate) {
      console.log('Date sélectionnée : ', this.selectedDate);
    } else {
      console.error('Aucune date sélectionnée');
    }
  }

  validateDate(): void {
    if (this.selectedDate) {
      console.log('Date validée : ', this.selectedDate);
    } else {
      console.error('Aucune date sélectionnée pour validation');
    }
  }
}
