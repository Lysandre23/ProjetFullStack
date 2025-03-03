import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService, Specialist } from '../services/admin.service';

@Component({
  selector: 'app-edit-doctor',
  imports: [FormsModule],
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  doctor: Specialist | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminService) {}

  ngOnInit(): void {
    const doctorId = this.route.snapshot.paramMap.get('id');
    if (doctorId) {
      this.adminService.getSpecialist(parseInt(doctorId, 10)).subscribe({
        next: (doctor) => {
          this.doctor = doctor;
        },
        error: (error) => {
          console.error('Error fetching doctor:', error);
          // Handle error appropriately
        }
      });
    }
  }

  onSubmit(): void {
    if (this.doctor) {
        this.adminService.updateSpecialist(this.doctor.id, this.doctor).subscribe({
            next: () => {
                alert(`Médecin ${this.doctor?.firstname} ${this.doctor?.lastname} mis à jour avec succès !`);
                this.router.navigate(['/manage-doctors']);
            },
            error: (error) => {
                console.error('Error updating specialist:', error);
                // Handle error appropriately
            }
        });
    } else {
        console.error('Doctor information is not available.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/manage-doctors']);
  }
}
