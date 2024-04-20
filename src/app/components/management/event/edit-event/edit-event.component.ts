import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EventService } from 'src/app/services/event/event.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss',
})
export class EditEventComponent implements OnInit {
  editEventForm!: FormGroup;
  stores: any[] = [];
  eventDetails: any = {};
  eventId: any;

  constructor(
    private fb: FormBuilder,
    private event: EventService,
    private store: StoreService,
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
      this.editEventForm.patchValue(res);
    });

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });

    this.editEventForm = this.fb.group({
      eventId: [''],
      storeId: [''],
      title: [''],
      image: [''],
      description: [''],
      location: [''],
      startDate: [''],
      endDate: [''],
      startTime: [''],
      endTime: [''],
    });
  }

  onSubmit(id: number) {
    if (this.editEventForm.valid) {
      console.log(this.editEventForm.value);
      this.event.updateEvent(id, this.editEventForm.value).subscribe(
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
    }
  }
}
