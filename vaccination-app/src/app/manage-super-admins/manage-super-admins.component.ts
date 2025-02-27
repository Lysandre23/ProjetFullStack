import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-super-admins',
  standalone: true,
  imports: [CommonModule], // Ajout de CommonModule
  templateUrl: './manage-super-admins.component.html',
  styleUrls: ['./manage-super-admins.component.css'],
})
export class ManageSuperAdminsComponent implements OnInit {
  superAdmins: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchSuperAdmins();
  }

  fetchSuperAdmins(): void {
    this.apiService.getSuperAdmins().subscribe((data) => {
      this.superAdmins = data;
    });
  }

  onCreate(): void {
    const newAdmin = {
      centerid: null, // Super admin n'a pas forcément de centre
      isSuperAdmin: true,
      name: 'Nouveau Super Admin',
      email: 'newsuperadmin@example.com'
    };

    this.apiService.createAdmin(newAdmin).subscribe(() => {
      alert('Super administrateur ajouté avec succès');
      this.fetchSuperAdmins(); // Rafraîchit la liste après ajout
    });
  }

  onEdit(admin: any): void {
    const updatedAdmin = { ...admin, name: 'Nom modifié' };

    this.apiService.createAdmin(updatedAdmin).subscribe(() => {
      alert(`Super administrateur modifié : ${admin.name}`);
      this.fetchSuperAdmins(); // Rafraîchit la liste après modification
    });
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce super administrateur ?')) {
      this.apiService.deleteReservation(id).subscribe(() => {
        alert('Super administrateur supprimé');
        this.fetchSuperAdmins(); // Rafraîchit la liste après suppression
      });
    }
  }
}
