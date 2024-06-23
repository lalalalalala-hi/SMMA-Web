import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { LocationService } from 'src/app/services/location/location.service';
import { EventService } from 'src/app/services/event/event.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  imageUrls: { [key: string]: SafeUrl } = {};
  events: any[] = [];
  stores: any[] = [];
  locations: any[] = [];

  constructor(
    private event: EventService,
    private store: StoreService,
    private location: LocationService,
    private imageService: ImageUploadService,
    private toast: NgToastService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.event.getAllEvents().subscribe((res: any) => {
      this.events = res;
      this.loadImages();
    });

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });
  }

  getStoreName(id: string) {
    return this.stores.find((s) => s.storeId === id)?.name;
  }

  getLocationName(id: string) {
    return this.locations.find((l) => l.locationId === id)?.locationName;
  }

  loadImages(): void {
    this.events.forEach((event) => {
      if (event.image) {
        this.imageService.getImage(event.image).subscribe(
          (data: Blob) => {
            const objectURL = URL.createObjectURL(data);
            this.imageUrls[event.image] =
              this.sanitizer.bypassSecurityTrustUrl(objectURL);
          },
          (error) => {
            console.error('Error fetching image:', error);
          }
        );
      }
    });
  }

  deleteEvent(id: number) {
    this.event.deleteEvent(id).subscribe(
      (res: any) => {
        this.events = this.events.filter((e) => e.eventId !== id);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Store Deleted Successfully',
          duration: 5000,
        });
        this.initialize();
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Store Deletion Failed',
          duration: 5000,
        });
      }
    );
  }
}
