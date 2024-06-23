import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LocationService } from 'src/app/services/location/location.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { PromoService } from 'src/app/services/promo/promo.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrl: './add-promo.component.scss',
})
export class AddPromoComponent {
  addPromoForm!: FormGroup;
  stores: any[] = [];
  locations: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private promo: PromoService,
    private store: StoreService,
    private location: LocationService,
    private imageUploadService: ImageUploadService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });

    this.addPromoForm = this.fb.group({
      promotionId: [''],
      storeId: [''],
      title: [''],
      image: [''],
      description: [''],
      locationId: [''],
      startDate: [''],
      endDate: [''],
      startTime: ['10:00'],
      endTime: ['22:00'],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.addPromoForm.valid) {
      if (this.selectedFile) {
        this.imageUploadService.uploadFile(this.selectedFile).subscribe(
          (uploadRes: any) => {
            const filename = uploadRes.filename;
            const promoData = { ...this.addPromoForm.value, image: filename };

            this.promo.addPromo(promoData).subscribe(
              (res: any) => {
                this.addPromoForm.reset();
                this.toast.success({
                  detail: 'SUCCESS',
                  summary: 'Promotion Added Successfully',
                  duration: 5000,
                });
                this.router.navigate(['promo-list']);
              },
              (err) => {
                this.toast.error({
                  detail: 'ERROR',
                  summary: 'Promotion Add Failed',
                  duration: 5000,
                });
              }
            );
          },
          (uploadErr) => {
            this.toast.error({
              detail: 'ERROR',
              summary: 'Image Upload Failed',
              duration: 5000,
            });
          }
        );
      }
    }
  }
}
