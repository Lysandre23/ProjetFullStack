import { Component } from '@angular/core';
import { VaccinationCenter } from '../vaccination-center';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-vaccination-center-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './vaccination-center-list.component.html',
  styleUrl: './vaccination-center-list.component.css'
})
export class VaccinationCenterListComponent {
  centers: VaccinationCenter[] = [
    { id: 1, name: "Hopital Central 1", address: "Rue du pont", postalCode: "54000", city: "Nancy"},
    { id: 2, name: "Hopital Central 2", address: "Rue du pont", postalCode: "75000", city: "Paris"},
    { id: 3, name: "Hopital Central 3", address: "Rue du pont", postalCode: "21000", city: "Dijon"},
  ]

  selectedCenter?: VaccinationCenter;

  select(center: VaccinationCenter) {
    this.selectedCenter = center;
  }
}