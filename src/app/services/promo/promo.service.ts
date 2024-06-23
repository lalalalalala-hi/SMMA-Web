import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class PromoService {
  private baseUrl = `${this.configService.baseUrl}/Promotion`;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAllPromos() {
    return this.http.get(this.baseUrl);
  }

  getPromoById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addPromo(promoObj: any) {
    return this.http.post(this.baseUrl, promoObj);
  }

  updatePromo(id: number, promoObj: any) {
    return this.http.put(`${this.baseUrl}/${id}`, promoObj);
  }

  deletePromo(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
