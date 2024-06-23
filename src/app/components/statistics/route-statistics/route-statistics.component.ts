import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-route-statistics',
  templateUrl: './route-statistics.component.html',
  styleUrl: './route-statistics.component.scss',
})
export class RouteStatisticsComponent implements OnInit {
  routes: any = [];
  pieInfo: any = [];
  barInfo: any = [];

  constructor(private route: RouteService) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.route.getAllRoutes().subscribe((res: any) => {
      this.routes = res;
    });

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
