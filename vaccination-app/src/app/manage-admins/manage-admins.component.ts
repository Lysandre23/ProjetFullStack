import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-admins',
  standalone: true,
  imports: [CommonModule], // Ajout de CommonModule
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css'],
})
export class ManageAdminsComponent implements OnInit {
  admins: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchAdmins();
  }

  fetchAdmins(): void {
    this.apiService.getAdmins().subscribe((data) => {
      this.admins = data;
    });
  }

  onCreate(): void {
    const newAdmin = {
      centerid: 2,
      isSuperAdmin: false,
      name: 'Nouvel Admin',
    };

    this.apiService.createAdmin(newAdmin).subscribe(() => {
      alert('Administrateur ajouté avec succès');
      this.fetchAdmins(); // Rafraîchit la liste
    });
  }

  onEdit(admin: any): void {
    const updatedAdmin = { ...admin, name: 'Admin Modifié' };

    this.apiService.createAdmin(updatedAdmin).subscribe(() => {
      alert(`Administrateur modifié : ${admin.name}`);
      this.fetchAdmins(); // Rafraîchit la liste
    });
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) {
      this.apiService.deleteReservation(id).subscribe(() => {
        alert('Administrateur supprimé');
        this.fetchAdmins(); // Rafraîchit la liste
      });
    }
  }
}
