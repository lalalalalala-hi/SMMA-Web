import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import { EventService } from 'src/app/services/event/event.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.scss',
})
export class ViewEventComponent implements OnInit {
  eventDetails: any = [];
  stores: any[] = [];
  locations: any[] = [];
  imageUrl: SafeUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private event: EventService,
    private store: StoreService,
    private location: LocationService,
    private imageService: ImageUploadService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.route.queryParams.subscribe((params) => {
      const eventId = params['eventId'];

      this.event.getEventById(eventId).subscribe((res: any) => {
        this.eventDetails = res;
        this.getImage(this.eventDetails.image);
      });

      this.store.getAllStores().subscribe((res: any) => {
        this.stores = res;
      });
    });

    this.location.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });
  }

  getStoreName(id: string) {
    return this.stores.find((s: any) => s.storeId === id)?.name;
  }

  getLocationName(id: string) {
    return this.locations.find((l) => l.locationId === id)?.locationName;
  }

  getImage(filename: string) {
    this.imageService.getImage(filename).subscribe(
      (data: Blob) => {
        const objectURL = URL.createObjectURL(data);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }
}
