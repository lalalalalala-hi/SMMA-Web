import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://localhost:7103/api/User';
  constructor(private http: HttpClient, private router: Router) {}

  getAllUsers() {
    return this.http.get(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
