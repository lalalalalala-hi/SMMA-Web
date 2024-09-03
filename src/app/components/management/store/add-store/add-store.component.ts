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
import { CategoryService } from 'src/app/services/category/category.service';
import { FloorService } from 'src/app/services/floor/floor.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
})
export class AddStoreComponent implements OnInit {
  addStoreForm!: FormGroup;
  selectedFile: File | null = null;
  floors: any[] = [];
  categories: any[] = [];
  stores: any[] = [];
  locations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private floor: FloorService,
    private category: CategoryService,
    private location: LocationService,
    private store: StoreService,
    private imageUploadService: ImageUploadService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.floor.getAllFloors().subscribe((res: any) => {
      this.floors = res;
    });

    this.category.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });

    this.addStoreForm = this.fb.group(
      {
        storeId: [''],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
          ],
        ],
        image: ['', Validators.required],
        categoryId: ['', Validators.required],
        floorId: ['', Validators.required],
        locationId: ['', Validators.required],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(51),
            Validators.maxLength(250),
          ],
        ],
        contactNumber: [
          '',
          [Validators.required, Validators.pattern(/^01\d{9,10}$/)],
        ],
        status: ['', Validators.required],
        openingTime: ['10:00', Validators.required],
        closingTime: ['22:00', Validators.required],
      },
      { validators: this.timeValidator }
    );
  }

  timeValidator(control: AbstractControl): ValidationErrors | null {
    const openingTime = control.get('openingTime')?.value;
    const closingTime = control.get('closingTime')?.value;
    if (openingTime && closingTime && openingTime >= closingTime) {
      return { invalidTime: true };
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
    if (this.addStoreForm.valid) {
      if (this.selectedFile) {
        this.imageUploadService.uploadFile(this.selectedFile).subscribe(
          (uploadRes: any) => {
            const filename = uploadRes.filename;
            const storeData = { ...this.addStoreForm.value, image: filename };

            this.store.addStore(storeData).subscribe(
              (res: any) => {
                this.addStoreForm.reset();
                this.stores.push(res);
                this.toast.success({
                  detail: 'SUCCESS',
                  summary: 'Store Added Successfully',
                  duration: 5000,
                });
                this.router.navigate(['store-list']);
              },
              (err) => {
                this.toast.error({
                  detail: 'ERROR',
                  summary: 'Store Add Failed',
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
