import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl = `${this.configService.baseUrl}/Location`;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAllLocations() {
    return this.http.get(this.baseUrl);
  }

  getLocationById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addLocation(locationObj: any) {
    return this.http.post(this.baseUrl, locationObj);
  }

  updateLocation(id: number, locationObj: any) {
    return this.http.put(`${this.baseUrl}/${id}`, locationObj);
  }

  deleteLocation(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
