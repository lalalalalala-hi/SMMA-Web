import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrl: './user-statistics.component.scss',
})
export class UserStatisticsComponent implements OnInit {
  users: any[] = [];
  title = 'ng-chart';
  doughnutInfo: any = [];
  lineInfo: any = [];

  constructor(private user: UserService) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.user.getAllUsers().subscribe((res: any) => {
      this.users = res;
      const maleCOunt = res.filter((u: any) => u.gender === 'Male').length;
      const femaleCount = res.filter((u: any) => u.gender === 'Female').length;
      this.doughnutChart([femaleCount, maleCOunt]);

      const age1 = res.filter((u: any) => u.age >= 1 && u.age <= 10).length;
      const age2 = res.filter((u: any) => u.age >= 11 && u.age <= 20).length;
      const age3 = res.filter((u: any) => u.age >= 21 && u.age <= 30).length;
      const age4 = res.filter((u: any) => u.age >= 31 && u.age <= 40).length;
      const age5 = res.filter((u: any) => u.age >= 41 && u.age <= 50).length;
      const age6 = res.filter((u: any) => u.age >= 51 && u.age <= 60).length;
      const age7 = res.filter((u: any) => u.age >= 61 && u.age <= 70).length;
      const age8 = res.filter((u: any) => u.age >= 71 && u.age <= 80).length;
      this.lineChart([age1, age2, age3, age4, age5, age6, age7, age8]);
    });
  }

  // calculate number of user
  getNumberOfUser() {
    return this.users.length;
  }

  doughnutChart(data: number[]) {
    this.doughnutInfo = new Chart('doughnutCanvas', {
      type: 'doughnut',
      data: {
        labels: ['Female', 'Male'],
        datasets: [
          {
            label: 'Number of users',
            data: data,
            backgroundColor: ['red', 'blue'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Gender',
            font: {
              size: 15,
            },
          },
        },
        aspectRatio: 2.5,
      },
    });
  }

  lineChart(data: number[]) {
    this.lineInfo = new Chart('lineCanvas', {
      type: 'line',
      data: {
        labels: [
          '1-10',
          '11-20',
          '21-30',
          '31-40',
          '41-50',
          '51-60',
          '61-70',
          '71-80',
        ],
        datasets: [
          {
            label: 'Age',
            data: data,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Age',
            font: {
              size: 15,
            },
          },
        },
        aspectRatio: 2.5,
      },
    });
  }
}
