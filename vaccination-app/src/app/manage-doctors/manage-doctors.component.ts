import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule], 
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.css'],
})
export class ManageDoctorsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'specialty', 'actions'];
  doctors: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.apiService.getSpecialists().subscribe((data) => {
      this.doctors = data;
    });
  }

  onCreate(): void {
    const newDoctor = {
      centerid: 1,
      name: 'Nouveau Médecin',
      specialty: 'Généraliste',
      email: 'newdoctor@example.com',
      phone: '0123456789',
      isadmin: false
    };

    this.apiService.createSpecialist(newDoctor).subscribe(() => {
      alert('Médecin ajouté avec succès');
      this.fetchDoctors(); // Rafraîchit la liste après ajout
    });
  }

  onEdit(doctor: any): void {
    const updatedDoctor = { ...doctor, name: 'Nom modifié' };

    this.apiService.createSpecialist(updatedDoctor).subscribe(() => {
      alert(`Médecin modifié : ${doctor.name}`);
      this.fetchDoctors(); // Rafraîchit la liste après modification
    });
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      this.apiService.deleteReservation(id).subscribe(() => {
        alert('Médecin supprimé');
        this.fetchDoctors(); // Rafraîchit la liste après suppression
      });
    }
  }
}
