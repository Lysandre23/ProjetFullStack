import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-centers',
  standalone: true,
  imports: [CommonModule], // Ajout de CommonModule
  templateUrl: './manage-centers.component.html',
  styleUrls: ['./manage-centers.component.css'],
})
export class ManageCentersComponent {
  centers = [
    { id: 1, name: 'Centre 1', address: 'Rue A', postalCode: '54000', city: 'Nancy' },
    { id: 2, name: 'Centre 2', address: 'Rue B', postalCode: '75000', city: 'Paris' },
    { id: 3, name: 'Centre 3', address: 'Rue C', postalCode: '69000', city: 'Lyon' },
  ];

  onCreate(): void {
    alert('Créer un nouveau centre');
    // Implémenter la logique pour ajouter un nouveau centre
  }

  onEdit(center: any): void {
    alert(`Modifier le centre : ${center.name}`);
    // Implémenter la logique pour modifier un centre
  }
}