import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-route-statistics',
  templateUrl: './route-statistics.component.html',
  styleUrl: './route-statistics.component.scss',
})
export class RouteStatisticsComponent implements OnInit {
  pieInfo: any = [];
  barInfo: any = [];

  ngOnInit() {
    this.pieChart();
    this.barChart();
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
