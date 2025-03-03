import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Center {
  id: number;
  name: string;
  address: string;
  city: string;
}

export interface Specialist {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  specialty: string;
  admin: boolean;
  phone: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getAllCenters(): Observable<Center[]> {
    return this.http.get<Center[]>(`${this.baseUrl}/centers`);
  }

  getCenterBySpecialist(specialistId: number): Observable<Center> {
    return this.http.get<Center>(`${this.baseUrl}/specialists/${specialistId}/center`);
  }

  getSpecialistsByCenter(centerId: number): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.baseUrl}/centers/${centerId}/specialists`);
  }
} 