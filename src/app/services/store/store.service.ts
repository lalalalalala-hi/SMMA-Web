import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private baseUrl = `${this.configService.baseUrl}/Store`;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAllStores() {
    return this.http.get(this.baseUrl);
  }

  getStoreById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addStore(storeObj: any) {
    return this.http.post(this.baseUrl, storeObj);
  }

  updateStore(id: number, storeObj: any) {
    return this.http.put(`${this.baseUrl}/${id}`, storeObj);
  }

  deleteStore(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
