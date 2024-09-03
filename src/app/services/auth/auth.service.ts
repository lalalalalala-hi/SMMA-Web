import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigService } from '../config/config.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${this.configService.baseUrl}/User`;
  private userPayload: any;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {
    this.userPayload = this.decodeToken();
  }

  signup(userObj: any) {
    return this.http.post(this.baseUrl, userObj);
  }

  login(loginObj: any) {
    return this.http.post(`${this.baseUrl}/auth`, loginObj);
  }

  signout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getfullNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }

  getUserRole(token: string): Observable<string> {
    // Extract role from the token or make a request to get the user's role
    // Example assuming role is part of the token payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    return of(payload.role); // Use 'of' to return an Observable if role is part of the token
    // Alternatively, make an API call to fetch the role
    // return this.http.get<string>(`${this.baseUrl}/user-role`, { headers: { Authorization: `Bearer ${token}` } });
  }
  // renewToken(tokenApi : TokenApiModel){
  //   return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  // }
}
