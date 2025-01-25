import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-admins',
  standalone: true,
  imports: [CommonModule], // Ajout de CommonModule
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css'],
})
export class ManageAdminsComponent {
  admins = [
    { id: 1, name: 'Admin 1', email: 'admin1@example.com', centerName: 'Centre 1' },
    { id: 2, name: 'Admin 2', email: 'admin2@example.com', centerName: 'Centre 2' },
    { id: 3, name: 'Admin 3', email: 'admin3@example.com', centerName: 'Centre 3' },
  ];

  onCreate(): void {
    alert('Ajouter un nouvel administrateur');
    // Implémentez la logique pour ajouter un administrateur
  }

  onEdit(admin: any): void {
    alert(`Modifier l'administrateur : ${admin.name}`);
    // Implémentez la logique pour modifier un administrateur
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) {
      this.admins = this.admins.filter(admin => admin.id !== id);
    }
  }
}
