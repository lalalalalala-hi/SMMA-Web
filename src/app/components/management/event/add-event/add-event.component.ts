import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EventService } from 'src/app/services/event/event.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
})
export class AddEventComponent implements OnInit {
  addEventForm!: FormGroup;
  stores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private event: EventService,
    private store: StoreService,
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

    this.addEventForm = this.fb.group({
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

  onSubmit() {
    if (this.addEventForm.valid) {
      console.log(this.addEventForm.value);
      this.event.addEvent(this.addEventForm.value).subscribe(
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
            summary: 'Event failed to add',
            duration: 5000,
          });
        }
      );
    }
  }
}
