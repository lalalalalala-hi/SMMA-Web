import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { ImageUploadService } from 'src/app/services/image/image-upload.service';
import { PromoService } from 'src/app/services/promo/promo.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrl: './promo-list.component.scss',
})
export class PromoListComponent {
  imageUrls: { [key: string]: SafeUrl } = {};
  promos: any[] = [];
  stores: any[] = [];

  constructor(
    private promo: PromoService,
    private store: StoreService,
    private imageService: ImageUploadService,
    private toast: NgToastService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.promo.getAllPromos().subscribe((res: any) => {
      this.promos = res;
      this.loadImages();
    });

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });
  }

  getStoreName(id: string) {
    return this.stores.find((s) => s.storeId === id)?.name;
  }

  loadImages(): void {
    this.promos.forEach((promo) => {
      if (promo.image) {
        this.imageService.getImage(promo.image).subscribe(
          (data: Blob) => {
            const objectURL = URL.createObjectURL(data);
            this.imageUrls[promo.image] =
              this.sanitizer.bypassSecurityTrustUrl(objectURL);
          },
          (error) => {
            console.error('Error fetching image:', error);
          }
        );
      }
    });
  }

  deletePromo(id: number) {
    this.promo.deletePromo(id).subscribe(
      (res: any) => {
        this.promos = this.promos.filter((e) => e.promoId !== id);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Promotion Deleted Successfully',
          duration: 5000,
        });
        this.initialize();
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Promotion Deletion Failed',
          duration: 5000,
        });
      }
    );
  }
}
