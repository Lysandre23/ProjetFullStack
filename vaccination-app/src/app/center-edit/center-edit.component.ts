import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { VaccinationService } from '../services/vaccination.service';
import { VaccinationCenter } from '../model/vaccination-center.model';

@Component({
  selector: 'app-center-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './center-edit.component.html',
  styleUrls: ['./center-edit.component.css']
})
export class CenterEditComponent implements OnInit {
  centerForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  centerId: number;

  constructor(
    private fb: FormBuilder,
    private vaccinationService: VaccinationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.centerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.centerId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.centerId = +params['id'];
        this.loadCenter(this.centerId);
      }
    });
  }

  loadCenter(id: number) {
    this.isLoading = true;
    this.vaccinationService.getCenterById(id).subscribe({
      next: (center) => {
        this.centerForm.patchValue(center);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading center:', error);
        this.error = 'Erreur lors du chargement du centre';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.centerForm.valid) {
      this.isLoading = true;
      this.error = null;

      this.vaccinationService.updateCenter(this.centerId, this.centerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/manage-centers']);
        },
        error: (error) => {
          console.error('Error updating center:', error);
          this.error = 'Erreur lors de la modification du centre';
          this.isLoading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/manage-centers']);
  }
} 