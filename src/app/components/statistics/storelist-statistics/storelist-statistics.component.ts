import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { LocationService } from 'src/app/services/location/location.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-storelist-statistics',
  templateUrl: './storelist-statistics.component.html',
  styleUrl: './storelist-statistics.component.scss',
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
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.intialize();
    this.pieChart();
    this.barChart();
    this.bar2Chart();
  }

  intialize() {
    this.route.queryParams.subscribe((params) => {
      const storeId = params['storeId'];

      this.store.getStoreById(storeId).subscribe((res: any) => {
        this.storeDetails = res;
        this.getImage(this.storeDetails.image);
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
