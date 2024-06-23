import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

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

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
