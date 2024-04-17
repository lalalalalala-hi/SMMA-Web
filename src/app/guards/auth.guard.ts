import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Please login first',
        duration: 5000,
      });
      this.router.navigate(['login']);
      return false;
    }
  }
}
