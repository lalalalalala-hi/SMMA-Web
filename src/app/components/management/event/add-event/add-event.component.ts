import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LocationService } from 'src/app/services/location/location.service';
import { EventService } from 'src/app/services/event/event.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
})
export class AddEventComponent implements OnInit {
  addEventForm!: FormGroup;
  selectedFile: File | null = null;
  stores: any[] = [];
  locations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private event: EventService,
    private store: StoreService,
    private location: LocationService,
    private imageUploadService: ImageUploadService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });

    this.addEventForm = this.fb.group({
      eventId: [''],
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
    if (this.addEventForm.valid) {
      if (this.selectedFile) {
        this.imageUploadService.uploadFile(this.selectedFile).subscribe(
          (uploadRes: any) => {
            const filename = uploadRes.filename;
            const eventData = { ...this.addEventForm.value, image: filename };

            this.event.addEvent(eventData).subscribe(
              (res: any) => {
                this.addEventForm.reset();
                this.toast.success({
                  detail: 'SUCCESS',
                  summary: 'Event Added Successfully',
                  duration: 5000,
                });
                this.router.navigate(['event-list']);
              },
              (err) => {
                this.toast.error({
                  detail: 'ERROR',
                  summary: 'Event Add Failed',
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
