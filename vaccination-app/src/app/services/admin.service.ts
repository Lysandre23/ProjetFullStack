import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Admin {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string | null;
  admin: boolean;
  superAdmin: boolean;
}

export interface Center {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
}

export interface AdminWithCenter extends Admin {
  center?: Center;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = '/api/specialists';

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/admins`).pipe(
      catchError(error => {
        console.error('Error fetching admins:', error);
        throw error;
      })
    );
  }

  getAdminCenter(adminId: number): Observable<Center> {
    return this.http.get<Center>(`${this.apiUrl}/${adminId}/center`).pipe(
      catchError(error => {
        console.error(`Error fetching center for admin ${adminId}:`, error);
        throw error;
      })
    );
  }
} 