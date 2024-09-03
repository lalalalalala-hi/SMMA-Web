import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LocationService } from 'src/app/services/location/location.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { PromoService } from 'src/app/services/promo/promo.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.scss'],
})
export class AddPromoComponent implements OnInit {
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

    this.addPromoForm = this.fb.group(
      {
        promotionId: [''],
        storeId: ['', Validators.required],
        title: ['', Validators.required],
        image: ['', Validators.required],
        description: ['', Validators.required],
        locationId: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        startTime: ['10:00', Validators.required],
        endTime: ['22:00', Validators.required],
      },
      { validators: [this.dateRangeValidator, this.timeRangeValidator] }
    );
  }

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;
    if (startDate && endDate && startDate > endDate) {
      return { invalidDateRange: true };
    }
    return null;
  }

  timeRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;
    if (startTime && endTime && startTime >= endTime) {
      return { invalidTimeRange: true };
    }
    return null;
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
      } else {
        const promoData = { ...this.addPromoForm.value };
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
      }
    }
  }
}
