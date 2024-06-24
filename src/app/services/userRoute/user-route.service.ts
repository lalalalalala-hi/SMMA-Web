import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class UserRouteService {
  private baseUrl = `${this.configService.baseUrl}/UserRoute`;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAllUserRoutes() {
    return this.http.get(this.baseUrl);
  }

  getUserRouteById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addUserRoute(userRouteObj: any) {
    return this.http.post(this.baseUrl, userRouteObj);
  }

  updateUserRoute(id: string, userRouteObj: any) {
    return this.http.put(`${this.baseUrl}/${id}`, userRouteObj);
  }

  deleteUserRoute(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
