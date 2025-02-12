import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-centers',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './manage-centers.component.html',
  styleUrls: ['./manage-centers.component.css'],
})
export class ManageCentersComponent implements OnInit {
  centers: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'address', 'postalCode', 'city', 'actions'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCenters();
  }

  fetchCenters(): void {
    this.apiService.getCenters().subscribe((data) => {
      this.centers = data;
    });
  }

  onCreate(): void {
    const newCenter = {
      name: 'Nouveau Centre',
      address: 'Nouvelle Adresse',
      postalCode: '00000',
      city: 'Nouvelle Ville',
      phone: '0123456789',
      email: 'new@center.com',
    };

    this.apiService.createCenter(newCenter).subscribe(() => {
      alert('Centre ajouté avec succès');
      this.fetchCenters(); // Rafraîchit la liste après ajout
    });
  }

  onEdit(center: any): void {
    const updatedCenter = { ...center, name: 'Nom modifié' };

    this.apiService.createCenter(updatedCenter).subscribe(() => {
      alert(`Centre modifié : ${center.name}`);
      this.fetchCenters(); // Rafraîchit la liste après modification
    });
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce centre ?')) {
      this.apiService.deleteReservation(id).subscribe(() => {
        alert('Centre supprimé');
        this.fetchCenters(); // Rafraîchit la liste après suppression
      });
    }
  }
}
