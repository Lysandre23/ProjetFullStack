import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { VaccinationService } from '../services/vaccination.service';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-centers',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './manage-centers.component.html',
  styleUrls: ['./manage-centers.component.css']
})
export class ManageCentersComponent implements OnInit {
  centers: VaccinationCenter[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private vaccinationService: VaccinationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCenters();
  }

  loadCenters() {
    this.isLoading = true;
    this.error = null;

    this.vaccinationService.getAllCenters().subscribe({
      next: (centers) => {
        this.centers = centers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading centers:', error);
        this.error = 'Erreur lors du chargement des centres';
        this.isLoading = false;
      }
    });
  }

  createNewCenter() {
    this.router.navigate(['/create-center']);
  }

  onEdit(center: VaccinationCenter): void {
    this.router.navigate(['/edit-center', center.id]);
  }

  onDelete(center: VaccinationCenter): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmer la suppression',
        message: `Êtes-vous sûr de vouloir supprimer le centre "${center.name}" ? Cette action supprimera également tous les spécialistes associés à ce centre.`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.vaccinationService.deleteCenter(center.id).subscribe({
          next: () => {
            this.loadCenters();
          },
          error: (error) => {
            console.error('Error deleting center:', error);
            this.error = 'Erreur lors de la suppression du centre';
            this.isLoading = false;
          }
        });
      }
    });
  }
}