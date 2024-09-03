import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Chart from 'chart.js/auto';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { LocationService } from 'src/app/services/location/location.service';
import { RouteService } from 'src/app/services/route/route.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-store-statistics',
  templateUrl: './store-statistics.component.html',
  styleUrl: './store-statistics.component.scss',
})
export class StoreStatisticsComponent implements OnInit {
  imageUrls: { [key: string]: SafeUrl } = {};
  stores: any[] = [];
  categories: any[] = [];
  locations: any[] = [];
  routes: any[] = [];
  barInfo: any = [];
  bar2Info: any = [];
  pieInfo: any = []; // Add a new property for the pie chart

  constructor(
    private store: StoreService,
    private category: CategoryService,
    private location: LocationService,
    private imageService: ImageUploadService,
    private route: RouteService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.category.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
      this.loadImages();
      this.prepareCategoryData();
    });

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });

    this.route.getAllRoutes().subscribe((res: any) => {
      this.routes = res;
      this.prepareRouteData();
    });
  }

  getCategoryName(id: string) {
    return this.categories.find((c) => c.categoryId === id)?.categoryName;
  }

  getLocationName(id: string) {
    return this.locations.find((l) => l.locationId === id)?.locationName;
  }

  getFootPrint(storeName: string): number {
    const relevantRoutes = this.routes.filter(
      (route) => route.endRoute.substring(7) === storeName
    );
    return relevantRoutes.reduce((acc, route) => acc + route.count, 0);
  }

  getActiveStore() {
    return this.stores.filter((store) => store.status === 'active').length;
  }

  getPendingStore() {
    return this.stores.filter((store) => store.status === 'pending').length;
  }

  getEmptyStore() {
    return this.stores.filter((store) => store.status === 'empty').length;
  }

  loadImages(): void {
    this.stores.forEach((store) => {
      if (store.image) {
        this.imageService.getImage(store.image).subscribe(
          (data: Blob) => {
            const objectURL = URL.createObjectURL(data);
            this.imageUrls[store.image] =
              this.sanitizer.bypassSecurityTrustUrl(objectURL);
          },
          (error) => {
            console.error('Error fetching image:', error);
          }
        );
      }
    });
  }

  prepareRouteData() {
    const routeCounts: { [key: string]: number } = this.routes.reduce(
      (
        acc: { [key: string]: number },
        route: { endRoute: string; count: number }
      ) => {
        const endRoute = route.endRoute.substring(7);
        if (!acc[endRoute]) {
          acc[endRoute] = 0;
        }
        acc[endRoute] += route.count;
        return acc;
      },
      {}
    );

    const sortedRoutes = Object.entries(routeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = sortedRoutes.map((route) => route[0]);
    const data = sortedRoutes.map((route) => route[1]);

    this.barChart(labels, data);
  }

  prepareCategoryData() {
    const categoryMap = new Map<string, number>();

    this.stores.forEach((store) => {
      const categoryName = this.getCategoryName(store.categoryId);

      if (categoryName) {
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, 0);
        }
        categoryMap.set(categoryName, categoryMap.get(categoryName)! + 1);
      }
    });

    const labels = Array.from(categoryMap.keys());
    const data = Array.from(categoryMap.values());

    this.pieChart(labels, data);
  }

  barChart(labels: string[], data: number[]) {
    this.barInfo = new Chart('barCanvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of destinations',
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Top 5 Popular Stores',
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

  pieChart(labels: string[], data: number[]) {
    this.pieInfo = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of Stores',
            data: data,
            backgroundColor: [
              'red',
              'blue',
              'green',
              'yellow',
              'purple',
              'orange',
            ],
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Store Popularity by Category',
            font: {
              size: 15,
            },
          },
        },
      },
    });
  }
}
