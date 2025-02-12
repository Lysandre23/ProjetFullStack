import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

interface VaccinationCenter {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  city: string;
}

@Component({
  selector: 'app-vaccination-center',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.css']
})
export class VaccinationCenterComponent implements OnInit {
  center: VaccinationCenter | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCenter(2); // Charge le centre par défaut (id = 2)
  }

  fetchCenter(id: number): void {
    this.apiService.getCenters().subscribe((centers) => {
      this.center = centers.find((c: VaccinationCenter) => c.id === id) || null;
    });
  }

  clearName(): void {
    if (this.center) {
      this.center.name = '';
    }
  }
}
