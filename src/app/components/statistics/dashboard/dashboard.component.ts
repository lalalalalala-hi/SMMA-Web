import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  pieInfo: any = [];
  barInfo: any = [];

  constructor(
    private auth: AuthService,
    private user: UserService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.user.getAllUsers().subscribe((res: any) => {
      this.users = res;
    });

    this.pieChart();
    this.barChart();
  }

  logout() {
    this.auth.signout();
    this.toast.success({
      detail: 'SUCCESS',
      summary: 'Log out successfully',
      duration: 5000,
    });
  }

  pieChart() {
    this.pieInfo = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: ['10-20', '21-30', '31-40', '41-50', '51-60', '61-70'],
        datasets: [
          {
            label: 'Number of users',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Age Distribution of Users',
            font: {
              size: 15,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  barChart() {
    this.barInfo = new Chart('barCanvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Number of destinations',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Popular Store',
            font: {
              size: 15,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
