import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { LocationService } from 'src/app/services/location/location.service';
import { StoreService } from 'src/app/services/store/store.service';

import { UserService } from 'src/app/services/user/user.service';
import { RouteService } from 'src/app/services/route/route.service';
import { UserRouteService } from 'src/app/services/userRoute/user-route.service';

@Component({
  selector: 'app-storelist-statistics',
  templateUrl: './storelist-statistics.component.html',
  styleUrls: ['./storelist-statistics.component.scss'],
})
export class StorelistStatisticsComponent implements OnInit {
  storeDetails: any = [];
  categories: any[] = [];
  locations: any[] = [];
  imageUrl: SafeUrl | undefined;
  pieInfo: any = [];
  barInfo: any = [];
  bar2Info: any = [];

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private category: CategoryService,
    private location: LocationService,
    private imageService: ImageUploadService,
    private sanitizer: DomSanitizer,
    private userRouteService: UserRouteService,
    private userService: UserService,
    private routeService: RouteService
  ) {}

  ngOnInit() {
    this.intialize();
    this.pieChart();
    this.barChart();
    this.dailyFootprintChart();
    // this.bar2Chart();
  }

  intialize() {
    this.route.queryParams.subscribe((params) => {
      const storeId = params['storeId'];

      this.store.getStoreById(storeId).subscribe((res: any) => {
        this.storeDetails = res;
        this.getImage(this.storeDetails.image);
        this.updateGenderPieChart(this.storeDetails.locationId);
        this.updateAgeBarChart(this.storeDetails.locationId);
        this.updateDailyFootprintChart(this.storeDetails.locationId);
      });
    });

    this.category.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });
  }

  getCategoryName(id: string) {
    return this.categories.find((c: any) => c.categoryId === id)?.categoryName;
  }

  getLocationName(id: string) {
    return this.locations.find((l) => l.locationId === id)?.locationName;
  }

  getImage(filename: string) {
    this.imageService.getImage(filename).subscribe(
      (data: Blob) => {
        const objectURL = URL.createObjectURL(data);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }

  updateGenderPieChart(locationId: string) {
    console.log('LocationId', locationId);

    this.userRouteService.getAllUserRoutes().subscribe((userRoutes: any) => {
      const routeIds = userRoutes.map((userRoute: any) => userRoute.routeId);

      this.routeService.getAllRoutes().subscribe((routes: any) => {
        const filteredRoutes = routes.filter((route: any) =>
          route.endRoute.startsWith(this.getLocationName(locationId))
        );

        console.log('StoreLocation', this.getLocationName(locationId));

        const filteredUserRoutes = userRoutes.filter((userRoute: any) =>
          filteredRoutes.some(
            (route: any) => route.routeId === userRoute.routeId
          )
        );

        const userIds = filteredUserRoutes.map(
          (userRoute: any) => userRoute.userId
        );

        let maleCount = 0;
        let femaleCount = 0;
        let uniqueUserIds = new Set<string>();

        userIds.forEach((userId: string) => {
          if (!uniqueUserIds.has(userId)) {
            uniqueUserIds.add(userId);
            this.userService.getUserById(userId).subscribe((user: any) => {
              if (user.gender === 'Male') {
                maleCount++;
              } else if (user.gender === 'Female') {
                femaleCount++;
              }

              console.log(maleCount, femaleCount);

              this.pieInfo.data.datasets[0].data = [maleCount, femaleCount];
              this.pieInfo.update();
            });
          }
        });
      });
    });
  }

  updateAgeBarChart(locationId: string) {
    this.userRouteService.getAllUserRoutes().subscribe((userRoutes: any) => {
      const routeIds = userRoutes.map((userRoute: any) => userRoute.routeId);

      this.routeService.getAllRoutes().subscribe((routes: any) => {
        const filteredRoutes = routes.filter((route: any) =>
          route.endRoute.startsWith(this.getLocationName(locationId))
        );

        const filteredUserRoutes = userRoutes.filter((userRoute: any) =>
          filteredRoutes.some(
            (route: any) => route.routeId === userRoute.routeId
          )
        );

        const userIds = filteredUserRoutes.map(
          (userRoute: any) => userRoute.userId
        );

        let ageGroups = {
          male: {
            '1-10': 0,
            '10-20': 0,
            '21-30': 0,
            '31-40': 0,
            '41-50': 0,
            '51-60': 0,
            '61-70': 0,
            '71-80': 0,
          },
          female: {
            '1-10': 0,
            '10-20': 0,
            '21-30': 0,
            '31-40': 0,
            '41-50': 0,
            '51-60': 0,
            '61-70': 0,
            '71-80': 0,
          },
        };

        let uniqueUserIds = new Set<string>();

        userIds.forEach((userId: string) => {
          if (!uniqueUserIds.has(userId)) {
            uniqueUserIds.add(userId);
            this.userService.getUserById(userId).subscribe((user: any) => {
              let age = user.age; // Assuming age is a property of the user object
              let gender = user.gender; // Assuming gender is a property of the user object
              if (gender === 'Male') {
                if (age >= 1 && age <= 10) ageGroups.male['1-10']++;
                else if (age > 10 && age <= 20) ageGroups.male['10-20']++;
                else if (age > 20 && age <= 30) ageGroups.male['21-30']++;
                else if (age > 30 && age <= 40) ageGroups.male['31-40']++;
                else if (age > 40 && age <= 50) ageGroups.male['41-50']++;
                else if (age > 50 && age <= 60) ageGroups.male['51-60']++;
                else if (age > 60 && age <= 70) ageGroups.male['61-70']++;
                else if (age > 70 && age <= 80) ageGroups.male['71-80']++;
              } else if (gender === 'Female') {
                if (age >= 1 && age <= 10) ageGroups.female['1-10']++;
                else if (age > 10 && age <= 20) ageGroups.female['10-20']++;
                else if (age > 20 && age <= 30) ageGroups.female['21-30']++;
                else if (age > 30 && age <= 40) ageGroups.female['31-40']++;
                else if (age > 40 && age <= 50) ageGroups.female['41-50']++;
                else if (age > 50 && age <= 60) ageGroups.female['51-60']++;
                else if (age > 60 && age <= 70) ageGroups.female['61-70']++;
                else if (age > 70 && age <= 80) ageGroups.female['71-80']++;
              }

              // Update the chart data
              this.barInfo.data.datasets[0].data = Object.values(
                ageGroups.male
              );
              this.barInfo.data.datasets[1].data = Object.values(
                ageGroups.female
              );
              this.barInfo.update();
            });
          }
        });
      });
    });
  }

  updateDailyFootprintChart(locationId: string) {
    this.userRouteService.getAllUserRoutes().subscribe((userRoutes: any) => {
      const routeIds = userRoutes.map((userRoute: any) => userRoute.routeId);

      this.routeService.getAllRoutes().subscribe((routes: any) => {
        const filteredRoutes = routes.filter((route: any) =>
          route.endRoute.startsWith(this.getLocationName(locationId))
        );

        const filteredUserRoutes = userRoutes.filter((userRoute: any) =>
          filteredRoutes.some(
            (route: any) => route.routeId === userRoute.routeId
          )
        );

        const routeTimes = filteredUserRoutes.map(
          (userRoute: any) =>
            new Date(userRoute.routeTime).toISOString().split('T')[0]
        );

        let dailyCounts = routeTimes.reduce((acc: any, date: string) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        let labels = Object.keys(dailyCounts);
        let data = Object.values(dailyCounts);

        this.bar2Info.data.labels = labels;
        this.bar2Info.data.datasets[0].data = data;
        this.bar2Info.update();
      });
    });
  }

  pieChart() {
    this.pieInfo = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label: 'Number of users by gender',
            data: [0, 0],
            backgroundColor: ['blue', 'red'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Gender Distribution',
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
        labels: [
          '1-10',
          '10-20',
          '21-30',
          '31-40',
          '41-50',
          '51-60',
          '61-70',
          '71-80',
        ],
        datasets: [
          {
            label: 'Male',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'blue',
            borderWidth: 1,
          },
          {
            label: 'Female',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'red',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Age and Gender Distribution',
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

  dailyFootprintChart() {
    this.bar2Info = new Chart('barBigCanvas', {
      type: 'bar',
      data: {
        labels: [], // Initial empty labels
        datasets: [
          {
            label: 'Number of users',
            data: [], // Initial empty data
            backgroundColor: '#023e9e',
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

  // bar2Chart() {
  //   this.bar2Info = new Chart('bar2Canvas', {
  //     type: 'bar',

  //     data: {
  //       labels: [
  //         '2022-05-10',
  //         '2022-05-11',
  //         '2022-05-12',
  //         '2022-05-13',
  //         '2022-05-14',
  //         '2022-05-15',
  //         '2022-05-16',
  //         '2022-05-17',
  //       ],
  //       datasets: [
  //         {
  //           label: 'Male',
  //           data: ['467', '576', '572', '79', '92', '574', '573', '576'],
  //           backgroundColor: 'blue',
  //         },
  //         {
  //           label: 'Female',
  //           data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
  //           backgroundColor: 'red',
  //         },
  //       ],
  //     },
  //     options: {
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: 'Daily Footprint',
  //           font: {
  //             size: 15,
  //           },
  //         },
  //       },
  //       aspectRatio: 2.5,
  //     },
  //   });
  // }
}

// import { Component, OnInit } from '@angular/core';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { ActivatedRoute } from '@angular/router';
// import Chart from 'chart.js/auto';
// import { CategoryService } from 'src/app/services/category/category.service';
// import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
// import { LocationService } from 'src/app/services/location/location.service';
// import { StoreService } from 'src/app/services/store/store.service';

// @Component({
//   selector: 'app-storelist-statistics',
//   templateUrl: './storelist-statistics.component.html',
//   styleUrl: './storelist-statistics.component.scss',
// })
// export class StorelistStatisticsComponent implements OnInit {
//   storeDetails: any = [];
//   categories: any[] = [];
//   locations: any[] = [];
//   imageUrl: SafeUrl | undefined;
//   pieInfo: any = [];
//   barInfo: any = [];
//   bar2Info: any = [];

//   constructor(
//     private route: ActivatedRoute,
//     private store: StoreService,
//     private category: CategoryService,
//     private location: LocationService,
//     private imageService: ImageUploadService,
//     private sanitizer: DomSanitizer
//   ) {}

//   ngOnInit() {
//     this.intialize();
//     this.pieChart();
//     this.barChart();
//     this.bar2Chart();
//   }

//   intialize() {
//     this.route.queryParams.subscribe((params) => {
//       const storeId = params['storeId'];

//       this.store.getStoreById(storeId).subscribe((res: any) => {
//         this.storeDetails = res;
//         this.getImage(this.storeDetails.image);
//       });
//     });

//     this.category.getAllCategories().subscribe((res: any) => {
//       this.categories = res;
//     });

//     this.location.getAllLocations().subscribe((res: any) => {
//       this.locations = res;
//     });
//   }

//   getCategoryName(id: string) {
//     return this.categories.find((c: any) => c.categoryId === id)?.categoryName;
//   }

//   getLocationName(id: string) {
//     return this.locations.find((l) => l.locationId === id)?.locationName;
//   }

//   getImage(filename: string) {
//     this.imageService.getImage(filename).subscribe(
//       (data: Blob) => {
//         const objectURL = URL.createObjectURL(data);
//         this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
//       },
//       (error) => {
//         console.error('Error fetching image:', error);
//       }
//     );
//   }

//   pieChart() {
//     this.pieInfo = new Chart('pieCanvas', {
//       type: 'pie',
//       data: {
//         labels: ['Red', 'Blue'],
//         datasets: [
//           {
//             label: 'Number of destinations',
//             data: [12, 19],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         plugins: {
//           title: {
//             display: true,
//             text: 'Gender',
//             font: {
//               size: 15,
//             },
//           },
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   }

//   barChart() {
//     this.barInfo = new Chart('barBigCanvas', {
//       type: 'bar',
//       data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [
//           {
//             label: 'Number of destinations',
//             data: [12, 19, 3, 5, 2, 3],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         plugins: {
//           title: {
//             display: true,
//             text: 'Daily Footprint',
//             font: {
//               size: 15,
//             },
//           },
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   }

//   bar2Chart() {
//     this.bar2Info = new Chart('bar2Canvas', {
//       type: 'bar', //this denotes tha type of chart

//       data: {
//         // values on X-Axis
//         labels: [
//           '2022-05-10',
//           '2022-05-11',
//           '2022-05-12',
//           '2022-05-13',
//           '2022-05-14',
//           '2022-05-15',
//           '2022-05-16',
//           '2022-05-17',
//         ],
//         datasets: [
//           {
//             label: 'Male',
//             data: ['467', '576', '572', '79', '92', '574', '573', '576'],
//             backgroundColor: 'blue',
//           },
//           {
//             label: 'Female',
//             data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
//             backgroundColor: 'red',
//           },
//         ],
//       },
//       options: {
//         plugins: {
//           title: {
//             display: true,
//             text: 'Daily Footprint',
//             font: {
//               size: 15,
//             },
//           },
//         },
//         aspectRatio: 2.5,
//       },
//     });
//   }
// }
