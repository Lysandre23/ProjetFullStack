import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Center {
  id: number;
  name: string;
  address: string;
  city: string;
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
} 