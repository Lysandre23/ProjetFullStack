import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Admin {
  id: number;
  firstname: string;
  lastname: string;
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
  postalCode: string;
}

export interface AdminWithCenter extends Admin {
  center?: Center;
}

export interface Specialist {
  id: number;
  firstname: string;
  lastname: string;
  specialty: string;
  email: string;
  phone: string | null;
  admin: boolean;
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

  getAdmin(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${adminId}`).pipe(
      catchError(error => {
        console.error('Error fetching admin:', error);
        throw error;
      })
    );
  }

  updateAdmin(adminId: number, adminData: Partial<Admin>): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/${adminId}`, adminData).pipe(
      catchError(error => {
        console.error('Error updating admin:', error);
        throw error;
      })
    );
  }

  demoteAdmin(adminId: number): Observable<void> {
    console.log(`Demoting admin with ID: ${adminId}`);
    return this.http.put<void>(`${this.apiUrl}/${adminId}/demote/admin`, {}).pipe(
      catchError(error => {
        console.error('Error demoting admin:', error);
        throw error;
      })
    );
  }

  getAllSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.apiUrl}`).pipe(
      catchError(error => {
        console.error('Error fetching specialists:', error);
        throw error;
      })
    );
  }

  getSpecialist(specialistId: number): Observable<Specialist> {
    return this.http.get<Specialist>(`${this.apiUrl}/${specialistId}`).pipe(
      catchError(error => {
        console.error('Error fetching specialist:', error);
        throw error;
      })
    );
  }

  updateSpecialist(specialistId: number, specialistData: Partial<Specialist>): Observable<Specialist> {
    return this.http.put<Specialist>(`${this.apiUrl}/${specialistId}`, specialistData).pipe(
      catchError(error => {
        console.error('Error updating specialist:', error);
        throw error;
      })
    );
  }

  promoteToAdmin(specialistId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${specialistId}/promote/admin`, {}).pipe(
      catchError(error => {
        console.error('Error promoting specialist to admin:', error);
        throw error;
      })
    );
  }

  demoteSuperAdmin(adminId: number): Observable<void> {
    console.log(`Demoting super admin with ID: ${adminId}`);
    return this.http.put<void>(`${this.apiUrl}/${adminId}/demote/superadmin`, {}).pipe(
      catchError(error => {
        console.error('Error demoting super admin:', error);
        throw error;
      })
    );
  }

  promoteSuperAdmin(adminId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${adminId}/promote/superadmin`, {}).pipe(
      catchError(error => {
        console.error('Error promoting to super admin:', error);
        throw error;
      })
    );
  }
} 