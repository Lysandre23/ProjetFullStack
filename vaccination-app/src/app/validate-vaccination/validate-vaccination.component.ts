import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-validate-vaccination',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatTableModule], 
  templateUrl: './validate-vaccination.component.html',
  styleUrls: ['./validate-vaccination.component.css'],
})
export class ValidateVaccinationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'status', 'actions'];
  persons: any[] = [];
  filteredPersons: any[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPersons();
  }

  fetchPersons(): void {
    this.apiService.getPatients().subscribe((data) => {
      this.persons = data.map((p: any) => ({
        ...p,
        status: p.status || 'Non Vaccinée' // Définit un statut par défaut si manquant
      }));
      this.filteredPersons = [...this.persons];
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPersons = this.persons.filter(person => 
      person.name.toLowerCase().includes(term) || 
      person.email.toLowerCase().includes(term)
    );
  }
  

  onValidate(id: number): void {
    const person = this.persons.find(p => p.id === id);
    if (person) {
      const updatedPerson = { ...person, status: 'Vaccinée' };
      this.apiService.updatePatient(id, updatedPerson).subscribe(() => {
        alert(`${person.name} a été marqué(e) comme Vaccinée.`);
        this.fetchPersons(); // Rafraîchit la liste
      });
    }
  }

  onCancel(id: number): void {
    const person = this.persons.find(p => p.id === id);
    if (person) {
      const updatedPerson = { ...person, status: 'Non Vaccinée' };
      this.apiService.updatePatient(id, updatedPerson).subscribe(() => {
        alert(`La vaccination de ${person.name} a été annulée.`);
        this.fetchPersons(); // Rafraîchit la liste
      });
    }
  }
}