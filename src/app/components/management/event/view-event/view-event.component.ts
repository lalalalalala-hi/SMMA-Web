import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.scss',
})
export class ViewEventComponent implements OnInit {
  eventDetails: any = [];
  stores: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private event: EventService,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.intialize();
  }

  intialize() {
    this.route.queryParams.subscribe((params) => {
      const eventId = params['eventId'];
      console.log(eventId); // This will output the eventId value

      this.event.getEventById(eventId).subscribe((res: any) => {
        this.eventDetails = res;
        console.log(this.eventDetails);
      });

      this.store.getAllStores().subscribe((res: any) => {
        this.stores = res;
      });
    });
  }
  getStoreName(id: string) {
    return this.stores.find((s: any) => s.storeId === id)?.name;
  }
}
