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
import { EventService } from 'src/app/services/event/event.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  editEventForm!: FormGroup;
  stores: any[] = [];
  locations: any[] = [];
  eventDetails: any = {};
  eventId: any;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private event: EventService,
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
      const eventId = params['eventId'];
      this.eventId = eventId;
    });

    this.event.getEventById(this.eventId).subscribe((res: any) => {
      const { image, ...rest } = res;
      this.editEventForm.patchValue(rest);
    });

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });

    this.editEventForm = this.fb.group(
      {
        eventId: [''],
        storeId: ['', Validators.required],
        title: [
          '',
          [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(50),
          ],
        ],
        image: ['', Validators.required],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(51),
            Validators.maxLength(250),
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
    if (this.editEventForm.valid) {
      const formData = new FormData();
      Object.keys(this.editEventForm.value).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, this.editEventForm.value[key]);
        }
      });

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
        this.imageUploadService.uploadFile(this.selectedFile).subscribe(
          (uploadRes: any) => {
            const filename = uploadRes.filename;
            const eventData = { ...this.editEventForm.value, image: filename };

            this.event.updateEvent(id, eventData).subscribe(
              (res: any) => {
                this.editEventForm.reset();
                this.toast.success({
                  detail: 'SUCCESS',
                  summary: 'Event Updated Successfully',
                  duration: 5000,
                });
                this.router.navigate(['event-list']);
              },
              (error) => {
                console.log(error);
                this.toast.error({
                  detail: 'ERROR',
                  summary: 'Event Update Failed',
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
        this.event.updateEvent(id, this.editEventForm.value).subscribe(
          (res: any) => {
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Event Updated Successfully',
              duration: 5000,
            });
            this.router.navigate(['event-list']);
          },
          (err) => {
            this.toast.error({
              detail: 'ERROR',
              summary: 'Event Update Failed',
              duration: 5000,
            });
          }
        );
      }
    }
  }
}
