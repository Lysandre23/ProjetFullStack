import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VaccinationCenter } from '../model/vaccination-center.model';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  private apiUrl = '/api/centers'; // URL de base pour les centres de vaccination

  constructor(private http: HttpClient) {}

  // Récupérer tous les centres de vaccination
  getAllCenters(): Observable<VaccinationCenter[]> {
    return this.http.get<VaccinationCenter[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des centres:', error);
        throw error;
      })
    );
  }
}
