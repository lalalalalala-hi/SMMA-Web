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
  lineInfo: any = [];

  constructor(private route: RouteService) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.route.getAllRoutes().subscribe((res: any) => {
      this.routes = res;
      this.barChart();
      this.pieChart();
      this.lineChart();
      this.lineChart2();
    });
  }

  pieChart() {
    // Categorize the routes based on usage counts
    const usageCategories = {
      'Low usage (0-50)': 0,
      'Medium usage (51-100)': 0,
      'High usage (101 and above)': 0,
    };

    this.routes.forEach((route: any) => {
      if (route.count <= 50) {
        usageCategories['Low usage (0-50)']++;
      } else if (route.count <= 100) {
        usageCategories['Medium usage (51-100)']++;
      } else {
        usageCategories['High usage (101 and above)']++;
      }
    });

    const labels = Object.keys(usageCategories);
    const data = Object.values(usageCategories);

    this.pieInfo = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of routes',
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Route Usage Distribution',
            font: {
              size: 15,
            },
          },
        },
      },
    });
  }

  barChart() {
    // Sort the routes by count in descending order and get the top 5 routes
    const topRoutes = this.routes
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 5);

    // Extract the route labels and counts for the chart
    const routeLabels = topRoutes.map(
      (route: any) =>
        `${route.startRoute.substring(0, 6)} to ${route.endRoute.substring(
          0,
          6
        )}`
    );
    const routeCounts = topRoutes.map((route: any) => route.count);

    this.barInfo = new Chart('barCanvas', {
      type: 'bar',
      data: {
        labels: routeLabels,
        datasets: [
          {
            label: 'Number of times used',
            data: routeCounts,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Top 5 Popular Routes',
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

  lineChart() {
    // Calculate the distribution of routes by start location
    const startLocationCounts = this.routes.reduce((acc: any, route: any) => {
      const startLocation = route.startRoute.substring(0, 6);
      if (!acc[startLocation]) {
        acc[startLocation] = 0;
      }
      acc[startLocation]++;
      return acc;
    }, {});

    const labels = Object.keys(startLocationCounts).sort();
    const data = labels.map((key: any) => startLocationCounts[key]);

    this.lineInfo = new Chart('lineCanvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of routes starting from location',
            data: data,
            borderWidth: 1,
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Distribution of Routes by Start Location',
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

  lineChart2() {
    // Calculate the distribution of routes by end location
    const endLocationCounts = this.routes.reduce((acc: any, route: any) => {
      const endLocation = route.endRoute.substring(0, 6);
      if (!acc[endLocation]) {
        acc[endLocation] = 0;
      }
      acc[endLocation]++;
      return acc;
    }, {});

    // Sort the end locations in ascending order
    const sortedEndLocations = Object.keys(endLocationCounts).sort();
    const sortedData = sortedEndLocations.map(
      (key: any) => endLocationCounts[key]
    );

    this.lineInfo = new Chart('lineCanvas2', {
      type: 'line',
      data: {
        labels: sortedEndLocations,
        datasets: [
          {
            label: 'Number of routes ending at location',
            data: sortedData,
            borderWidth: 1,
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Distribution of Routes by End Location',
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
