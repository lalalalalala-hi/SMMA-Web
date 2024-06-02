import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/services/category/category.service';
import { FloorService } from 'src/app/services/floor/floor.service';
import { ImageUploadService } from 'src/app/services/image/image-upload.service';
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

  constructor(
    private store: StoreService,
    private floor: FloorService,
    private category: CategoryService,
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
        console.log(this.categories);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCategoryName(id: string) {
    return this.categories.find((c) => c.categoryId === id)?.categoryName;
  }

  getFloorName(id: string) {
    return this.floors.find((f) => f.floorId === id)?.floorName;
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
