import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7103/api/User';
  constructor(private http: HttpClient) {}

  signup(userObj: any) {
    return this.http.post(this.baseUrl, userObj);
  }

  login(loginObj: any) {
    return this.http.post(`${this.baseUrl}/auth`, loginObj);
  }
}
