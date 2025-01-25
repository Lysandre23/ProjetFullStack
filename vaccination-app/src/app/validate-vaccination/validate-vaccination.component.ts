import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validate-vaccination',
  standalone: true,
  imports: [CommonModule, FormsModule], // Combinaison des modules nécessaires
  templateUrl: './validate-vaccination.component.html',
  styleUrls: ['./validate-vaccination.component.css'],
})
export class ValidateVaccinationComponent {
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
    const person = this.persons.find(p => p.id === id);
    if (person) {
      person.status = 'Vaccinée';
      alert(`La vaccination de ${person.name} a été validée.`);
    }
  }
}
