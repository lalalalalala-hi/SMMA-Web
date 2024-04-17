import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  private baseUrl = 'https://localhost:7103/api/Floor';
  constructor(private http: HttpClient) {}

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
