import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  private baseUrl = `${this.configService.baseUrl}/Floor`;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAllFloors() {
    return this.http.get(this.baseUrl);
  }

  getFloorById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addFloor(floorObj: any) {
    return this.http.post(this.baseUrl, floorObj);
  }

  updateFloor(id: number, floorObj: any) {
    return this.http.put(`${this.baseUrl}/${id}`, floorObj);
  }

  deleteFloor(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
