import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-validate-vaccination',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatTableModule], // Combinaison des modules nécessaires
  templateUrl: './validate-vaccination.component.html',
  styleUrls: ['./validate-vaccination.component.css'],
})
export class ValidateVaccinationComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'status', 'actions'];
  persons = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'Non Vaccinée' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, status: 'Non Vaccinée' },
    { id: 3, name: 'Alice Brown', email: 'alice@example.com', age: 40, status: 'Vaccinée' },
  ];

  searchTerm: string = '';
  filteredPersons = [...this.persons];

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPersons = this.persons.filter(person => person.name.toLowerCase().includes(term));
  }

  onValidate(id: number): void {
    const person = this.filteredPersons.find(p => p.id === id);
    if (person) {
      person.status = 'Vaccinée'; // Change le statut en "Vaccinée"
      alert(`${person.name} a été marqué(e) comme Vaccinée.`);
    }
  }
  
  onCancel(id: number): void {
    const person = this.filteredPersons.find(p => p.id === id);
    if (person) {
      person.status = 'Non Vaccinée'; // Change le statut en "Non Vaccinée"
      alert(`La vaccination de ${person.name} a été annulée.`);
    }
  }
}
