import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-person',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.css'],
})
export class SearchPersonComponent {
  persons = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'Présent' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, status: 'Présent' },
    { id: 3, name: 'Alice Brown', email: 'alice@example.com', age: 40, status: 'Absente' },
  ];

  searchTerm: string = '';
  filteredPersons = [...this.persons];

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPersons = this.persons.filter(person => person.name.toLowerCase().includes(term));
  }
}
