import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = `${this.configService.baseUrl}/Events`;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAllEvents() {
    return this.http.get(this.baseUrl);
  }

  getEventById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addEvent(eventObj: any) {
    return this.http.post(this.baseUrl, eventObj);
  }

  updateEvent(id: number, eventObj: any) {
    return this.http.put(`${this.baseUrl}/${id}`, eventObj);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
