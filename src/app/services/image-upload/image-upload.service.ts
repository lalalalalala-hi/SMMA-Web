import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private apiUrl = `${this.configService.baseUrl}/Files`;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  uploadFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .post<string>(`${this.apiUrl}/UploadFile`, formData)
      .pipe(catchError(this.handleError));
  }

  getImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/GetImage?filename=${filename}`, {
      responseType: 'blob',
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
