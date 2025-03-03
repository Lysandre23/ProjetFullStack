import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Admin, AdminService, AdminWithCenter } from '../services/admin.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-admins',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css'],
})
export class ManageAdminsComponent implements OnInit {
  admins: AdminWithCenter[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.isLoading = true;
    this.error = null;

    this.adminService.getAllAdmins().subscribe({
      next: (admins) => {
        // Create an array of observables for fetching center information
        const centerRequests = admins.map(admin =>
          this.adminService.getAdminCenter(admin.id).pipe(
            map(center => ({ ...admin, center })),
            catchError(() => of({ ...admin, center: undefined }))
          )
        );

        // Execute all requests in parallel
        forkJoin(centerRequests).subscribe({
          next: (adminsWithCenters) => {
            this.admins = adminsWithCenters;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading centers:', error);
            this.error = 'Erreur lors du chargement des centres';
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading admins:', error);
        this.error = 'Erreur lors du chargement des administrateurs';
        this.isLoading = false;
      }
    });
  }

  onCreate(): void {
    alert('Ajouter un nouvel administrateur');
    // Implémentez la logique pour ajouter un administrateur
  }

  onEdit(admin: AdminWithCenter): void {
    this.router.navigate(['/edit-admin', admin.id]);
  }

  demoteAdmin(adminId: number) {
    this.isLoading = true;
    this.error = null;

    this.adminService.demoteAdmin(adminId).subscribe({
      next: () => {
        this.loadAdmins(); // Reload the list of admins after demotion
      },
      error: (error) => {
        console.error('Error demoting admin:', error);
        this.error = 'Erreur lors de la rétrogradation de l administrateur';
        this.isLoading = false;
      }
    });
  }

  promoteToSuperAdmin(adminId: number): void {
    this.adminService.promoteSuperAdmin(adminId).subscribe({
        next: () => {
            alert('Admin promoted to super admin successfully!');
            this.loadAdmins(); // Reload the list of admins
        },
        error: (error) => {
            console.error('Error promoting admin:', error);
            alert('Failed to promote admin.');
        }
    });
}

demoteSuperAdmin(adminId: number): Observable<void> {
    return this.adminService.demoteSuperAdmin(adminId).pipe(
        catchError(error => {
            console.error('Error demoting super admin:', error);
            throw error;
        })
    );
}
}