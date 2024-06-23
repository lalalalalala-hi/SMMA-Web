import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private baseUrl = `${this.configService.baseUrl}/Routes`;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAllRoutes() {
    return this.http.get(this.baseUrl);
  }

  getRouteById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addRoute(routeObj: any) {
    return this.http.post(this.baseUrl, routeObj);
  }

  updateRoute(id: number, routeObj: any) {
    return this.http.put(`${this.baseUrl}/${id}`, routeObj);
  }

  deleteRoute(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
