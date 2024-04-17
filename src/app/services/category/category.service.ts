import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'https://localhost:7103/api/Category';

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(this.baseUrl);
  }

  getCategoryById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addCategory(categoryObj: any) {
    return this.http.post(this.baseUrl, categoryObj);
  }

  updateCategory(id: number, categoryObj: any) {
    return this.http.put(`${this.baseUrl}/${id}`, categoryObj);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
