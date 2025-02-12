import { Component } from '@angular/core';
import { VaccinationCenter } from '../vaccination-center';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vaccination-center',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vaccination-center.component.html',
  styleUrl: './vaccination-center.component.css'
})
export class VaccinationCenterComponent {
  center: VaccinationCenter = {
    id: 2,
    name: "Hopital Central",
    address: "Rue du pont",
    postalCode: "54000",
    city: "Nancy"
  }

  clearName() {
    this.center.name = "";
  }
  
}