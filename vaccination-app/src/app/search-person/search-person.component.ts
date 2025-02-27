import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-person',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.css'],
})
export class SearchPersonComponent implements OnInit {
  persons: any[] = [];
  filteredPersons: any[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPersons();
  }

  fetchPersons(): void {
    this.apiService.getPatients().subscribe((data) => {
      this.persons = data;
      this.filteredPersons = [...this.persons];
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPersons = this.persons.filter(person =>
      person.name.toLowerCase().includes(term)
    );
  }
}
