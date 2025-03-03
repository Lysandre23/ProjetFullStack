import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import du FormsModule
import { AuthService } from '../auth.service';
import { Patient, ReservationService, Specialist } from '../services/reservation.service';
import { AdminService, AdminWithCenter } from '../services/admin.service';
import { CenterService } from '../services/center.service';

interface UserData {
    centerId: number;
}

interface Reservation {
    id: number;
    date: Date;
    done: boolean;
    patient: Patient;
    specialist: Specialist;
}

@Component({
  selector: 'app-manage-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule], // Combinaison des modules nécessaires
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css'],
})
export class ManageReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService, 
    private authService: AuthService,
    private adminService: AdminService,
    private centerService: CenterService
  ) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    const userId = this.authService.getUserId();
    if (this.authService.isSuperAdmin()) {
      this.reservationService.getAllReservations().subscribe({
        next: (reservations: Reservation[]) => {
          this.reservations = reservations;
          this.filteredReservations = [...this.reservations];
        },
        error: (error: Error) => {
          console.error('Error loading reservations:', error);
        }
      });
    }else {
      if (userId !== null) {
        this.centerService.getCenterBySpecialist(userId).subscribe({
            next: (center) => {
              console.log(center);
                this.reservationService.getReservationsByCenter(center.id).subscribe({
                    next: (data) => {
                        this.reservations = data;
                        console.log(this.reservations);
                        this.filteredReservations = [...this.reservations];
                    },
                    error: (error: Error) => {
                        console.error('Error loading reservations:', error);
                    }
                });
            },
            error: (error: Error) => {
                console.error('Error loading center data:', error);
            }
        });
      }
    }
  }

  onValidate(id: number): void {
    const reservation = this.reservations.find(r => r.id === id);
    if (reservation) {
      this.loadReservations();
    }
  }

  onCancel(id: number): void {
    const reservation = this.reservations.find(r => r.id === id);
    if (reservation) {
      this.loadReservations();
    }
  }

  deleteReservation(id: number) {
    if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          this.loadReservations();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }
}