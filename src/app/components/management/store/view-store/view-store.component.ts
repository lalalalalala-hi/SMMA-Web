import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-view-store',
  templateUrl: './view-store.component.html',
  styleUrl: './view-store.component.scss',
})
export class ViewStoreComponent implements OnInit {
  storeDetails: any = [];
  categories: any[] = [];
  locations: any[] = [];
  imageUrl: SafeUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private category: CategoryService,
    private location: LocationService,
    private imageService: ImageUploadService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.intialize();
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
}
