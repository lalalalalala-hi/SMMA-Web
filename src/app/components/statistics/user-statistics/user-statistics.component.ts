import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrl: './user-statistics.component.scss',
})
export class UserStatisticsComponent implements OnInit {
  title = 'ng-chart';
  doughnutInfo: any = [];
  lineInfo: any = [];

  ngOnInit() {
    this.doughnutChart();
    this.lineChart();
  }

  doughnutChart() {
    this.doughnutInfo = new Chart('doughnutCanvas', {
      type: 'doughnut',
      data: {
        labels: ['Female', 'Male'],
        datasets: [
          {
            label: 'Number of users',
            data: [300, 224],
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

  lineChart() {
    this.lineInfo = new Chart('lineCanvas', {
      type: 'line',
      data: {
        // values on X-Axis
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
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
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
