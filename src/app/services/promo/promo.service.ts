import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PromoService {
  private baseUrl = 'https://localhost:7103/api/Promotion';

  constructor(private http: HttpClient) {}

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
