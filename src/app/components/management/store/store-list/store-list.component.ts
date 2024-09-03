import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { LocationService } from 'src/app/services/location/location.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { FloorService } from 'src/app/services/floor/floor.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss',
})
export class StoreListComponent implements OnInit {
  imageUrls: { [key: string]: SafeUrl } = {};
  stores: any[] = [];
  floors: any[] = [];
  categories: any[] = [];
  locations: any[] = [];

  constructor(
    private store: StoreService,
    private floor: FloorService,
    private category: CategoryService,
    private location: LocationService,
    private imageService: ImageUploadService,
    private toast: NgToastService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.store.getAllStores().subscribe(
      (res: any) => {
        this.stores = res;
        this.loadImages();
      },
      (err) => {
        console.log(err);
      }
    );

    this.floor.getAllFloors().subscribe(
      (res: any) => {
        this.floors = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.category.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });
  }

  getCategoryName(id: string) {
    return this.categories.find((c) => c.categoryId === id)?.categoryName;
  }

  getFloorName(id: string) {
    return this.floors.find((f) => f.floorId === id)?.floorName;
  }

  getLocationName(id: string) {
    return this.locations.find((l) => l.locationId === id)?.locationName;
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

  deleteStore(id: number) {
    this.store.deleteStore(id).subscribe(
      (res: any) => {
        this.stores = this.stores.filter((s) => s.storeId !== id);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Store Deleted Successfully',
          duration: 5000,
        });
        this.initialize();
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Store Deletion Failed',
          duration: 5000,
        });
      }
    );
  }
}
