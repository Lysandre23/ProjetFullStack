import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, Specialist } from '../services/admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CenterService } from '../services/center.service';

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.css'],
})
export class ManageDoctorsComponent implements OnInit {
  doctors: Specialist[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private adminService: AdminService, private router: Router, public authService: AuthService, private centerService: CenterService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.isLoading = true;
    this.error = null;

    const userId = this.authService.getUserId();
    if (this.authService.isSuperAdmin()) {
      this.adminService.getAllSpecialists().subscribe({
        next: (doctors) => {
          this.doctors = doctors;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading doctors:', error);
          this.error = 'Erreur lors du chargement des médecins';
          this.isLoading = false;
        }
      });
    } else {
      if (userId !== null) {
        this.centerService.getCenterBySpecialist(userId).subscribe({
            next: (center) => {
                this.centerService.getSpecialistsByCenter(center.id).subscribe({
                    next: (doctors) => {
                        this.doctors = doctors;
                        this.isLoading = false;
                    },
                    error: (error) => {
                        console.error('Error loading doctors:', error);
                        this.error = 'Erreur lors du chargement des médecins';
                        this.isLoading = false;
                    }
                });
            },
            error: (error) => {
                console.error('Error loading center:', error);
                this.isLoading = false;
            }
        });
      }
    }
    
  }

  onEdit(doctor: Specialist): void {
    this.router.navigate(['/edit-doctor', doctor.id]);
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      this.doctors = this.doctors.filter(doctor => doctor.id !== id);
    }
  }

  promoteToAdmin(doctorId: number): void {
    this.adminService.promoteToAdmin(doctorId).subscribe({
      next: () => {
        console.log('Doctor promoted successfully!');
        this.loadDoctors();
      },
      error: (error) => {
        alert('Failed to promote doctor.');
      }
    });
  }

  demoteAdmin(doctorId: number): void {
    this.adminService.demoteAdmin(doctorId).subscribe({
      next: () => {
        console.log('Doctor demoted successfully!');
        this.loadDoctors();
      },
      error: (error) => {
        console.error('Error demoting doctor:', error);
      }
    });
  }
}