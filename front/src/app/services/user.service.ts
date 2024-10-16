import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  center_id: number;
  name: string;
  email: string;
  phone: string;
  is_admin: boolean;
}

@Injectable({
  providedIn: 'root'  // Provided globally
})
export class UserService {
  private apiUrl = 'http://localhost:8080/patients';  // Base URL of your Spring API

  constructor(private http: HttpClient) {}

  // Fetch all users from the backend
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Create a new user (POST request)
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
