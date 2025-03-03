import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Patient, PatientService } from '../services/patient.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-search-person',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.css'],
})
export class SearchPersonComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  searchTerm: string = '';
  isLoading = false;
  error: string | null = null;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.isLoading = true;
    this.error = null;

    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.filteredPatients = patients;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        this.error = 'Erreur lors du chargement des patients';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPatients = this.patients;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredPatients = this.patients.filter(patient => 
      patient.firstname.toLowerCase().includes(searchTermLower) ||
      patient.lastname.toLowerCase().includes(searchTermLower) ||
      patient.email.toLowerCase().includes(searchTermLower)
    );
  }

  onEdit(patient: Patient): void {
    this.router.navigate(['/edit-patient', patient.id]);
  }

  onDelete(patient: Patient): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmer la suppression',
        message: `Êtes-vous sûr de vouloir supprimer le patient "${patient.firstname} ${patient.lastname}" ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.patientService.deletePatient(patient.id).subscribe({
          next: () => {
            this.loadPatients();
          },
          error: (error) => {
            console.error('Error deleting patient:', error);
            this.error = 'Erreur lors de la suppression du patient';
            this.isLoading = false;
          }
        });
      }
    });
  }
}
