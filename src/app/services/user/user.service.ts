import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${this.configService.baseUrl}/User`;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {}

  getAllUsers() {
    return this.http.get(this.baseUrl);
  }

  getUserById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getDailyActiveUsers(): Observable<any> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    return this.http.get(
      `${this.baseUrl}/?lastActive_gte=${startOfDay.toISOString()}`
    );
  }

  getWeeklyActiveUsers(): Observable<any> {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    return this.http.get(
      `${this.baseUrl}/?lastActive_gte=${startOfWeek.toISOString()}`
    );
  }
}
