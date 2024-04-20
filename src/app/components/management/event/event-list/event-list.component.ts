import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EventService } from 'src/app/services/event/event.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  stores: any[] = [];

  constructor(
    private event: EventService,
    private store: StoreService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.event.getAllEvents().subscribe((res: any) => {
      this.events = res;
    });

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });
  }

  getStoreName(id: string) {
    return this.stores.find((s) => s.storeId === id)?.name;
  }

  deleteEvent(id: number) {
    this.event.deleteEvent(id).subscribe(
      (res: any) => {
        this.events = this.events.filter((e) => e.eventId !== id);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Store deleted successfully',
          duration: 5000,
        });
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: "Something's wrong",
          duration: 5000,
        });
      }
    );
  }
}
