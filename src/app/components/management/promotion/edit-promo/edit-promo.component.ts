import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LocationService } from 'src/app/services/location/location.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { PromoService } from 'src/app/services/promo/promo.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.scss'],
})
export class EditPromoComponent implements OnInit {
  editPromoForm!: FormGroup;
  stores: any[] = [];
  locations: any[] = [];
  promoDetails: any = {};
  promoId: any;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private promo: PromoService,
    private store: StoreService,
    private location: LocationService,
    private imageUploadService: ImageUploadService,
    private router: Router,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.route.queryParams.subscribe((params) => {
      const promoId = params['promoId'];
      this.promoId = promoId;
    });

    this.promo.getPromoById(this.promoId).subscribe((res: any) => {
      const { image, ...rest } = res;
      this.editPromoForm.patchValue(rest);
    });

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });

    this.editPromoForm = this.fb.group(
      {
        promotionId: [''],
        storeId: ['', Validators.required],
        title: [
          '',
          [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(50),
          ],
        ],
        image: [''],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(51),
            Validators.maxLength(159),
          ],
        ],
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

  onSubmit(id: number) {
    if (this.editPromoForm.valid) {
      const formData = new FormData();
      Object.keys(this.editPromoForm.value).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, this.editPromoForm.value[key]);
        }
      });

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
        this.imageUploadService.uploadFile(this.selectedFile).subscribe(
          (uploadRes: any) => {
            const filename = uploadRes.filename;
            const promoData = { ...this.editPromoForm.value, image: filename };

            this.promo.updatePromo(id, promoData).subscribe(
              (res: any) => {
                this.toast.success({
                  detail: 'SUCCESS',
                  summary: 'Promotion Updated Successfully',
                  duration: 5000,
                });
                this.router.navigate(['promo-list']);
              },
              (err) => {
                this.toast.error({
                  detail: 'ERROR',
                  summary: 'Promotion Update Failed',
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
        this.promo.updatePromo(id, this.editPromoForm.value).subscribe(
          (res: any) => {
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Promotion Updated Successfully',
              duration: 5000,
            });
            this.router.navigate(['promo-list']);
          },
          (err) => {
            this.toast.error({
              detail: 'ERROR',
              summary: 'Promotion Update Failed',
              duration: 5000,
            });
          }
        );
      }
    }
  }
}
