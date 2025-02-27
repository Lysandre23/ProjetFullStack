import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-super-admins',
  standalone: true,
  imports: [CommonModule], // Ajout de CommonModule
  templateUrl: './manage-super-admins.component.html',
  styleUrls: ['./manage-super-admins.component.css'],
})
export class ManageSuperAdminsComponent {
  superAdmins = [
    { id: 1, name: 'Super Admin 1', email: 'superadmin1@example.com' },
    { id: 2, name: 'Super Admin 2', email: 'superadmin2@example.com' },
    { id: 3, name: 'Super Admin 3', email: 'superadmin3@example.com' },
  ];

  onCreate(): void {
    alert('Ajouter un nouveau super administrateur');
    // Implémentez la logique pour ajouter un super admin
  }

  onEdit(admin: any): void {
    alert(`Modifier le super administrateur : ${admin.name}`);
    // Implémentez la logique pour modifier un super admin
  }

}