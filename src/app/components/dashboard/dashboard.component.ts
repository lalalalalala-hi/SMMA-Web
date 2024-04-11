import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  constructor(
    private auth: AuthService,
    private user: UserService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.user.getAllUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  logout() {
    this.auth.signout();
    this.toast.success({
      detail: 'SUCCESS',
      summary: 'Log out successfully',
      duration: 5000,
    });
  }
}
