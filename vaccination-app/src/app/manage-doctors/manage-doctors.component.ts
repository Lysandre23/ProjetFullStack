import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatButtonModule], // Ajout de CommonModule
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.css'],
})
export class ManageDoctorsComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'specialty', 'actions'];

  doctors = [
    { id: 1, name: 'Dr. Smith', email: 'smith@example.com', specialty: 'Cardiologie' },
    { id: 2, name: 'Dr. Johnson', email: 'johnson@example.com', specialty: 'Pédiatrie' },
    { id: 3, name: 'Dr. Brown', email: 'brown@example.com', specialty: 'Généraliste' },
  ];

  onCreate(): void {
    alert('Ajouter un nouveau médecin');
    // Implémentez la logique pour ajouter un médecin
  }

  onEdit(doctor: any): void {
    alert(`Modifier le médecin : ${doctor.name}`);
    // Implémentez la logique pour modifier un médecin
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      this.doctors = this.doctors.filter(doctor => doctor.id !== id);
    }
  }
}
