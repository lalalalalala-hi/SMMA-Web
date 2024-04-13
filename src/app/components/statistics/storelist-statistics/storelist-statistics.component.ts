import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-storelist-statistics',
  templateUrl: './storelist-statistics.component.html',
  styleUrl: './storelist-statistics.component.scss',
})
export class StorelistStatisticsComponent implements OnInit {
  pieInfo: any = [];
  barInfo: any = [];
  bar2Info: any = [];

  ngOnInit() {
    this.pieChart();
    this.barChart();
    this.bar2Chart();
  }

  pieChart() {
    this.pieInfo = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue'],
        datasets: [
          {
            label: 'Number of destinations',
            data: [12, 19],
            borderWidth: 1,
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
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  barChart() {
    this.barInfo = new Chart('barBigCanvas', {
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
            text: 'Daily Footprint',
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

  bar2Chart() {
    this.bar2Info = new Chart('bar2Canvas', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Male',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'blue',
          },
          {
            label: 'Female',
            data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Daily Footprint',
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
