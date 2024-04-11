import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userInfo: any = {};

  constructor(
    private auth: AuthService,
    private user: UserService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    // this.user.getUserById(1).subscribe((res: any) => {
    //   this.userInfo = res;
    // });
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
