import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PromoService } from 'src/app/services/promo/promo.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrl: './promo-list.component.scss',
})
export class PromoListComponent {
  promos: any[] = [];
  stores: any[] = [];

  constructor(
    private promo: PromoService,
    private store: StoreService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.promo.getAllPromos().subscribe((res: any) => {
      this.promos = res;
      console.log(this.promos);
    });

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });
  }

  getStoreName(id: string) {
    return this.stores.find((s) => s.storeId === id)?.name;
  }

  deletePromo(id: number) {
    this.promo.deletePromo(id).subscribe(
      (res: any) => {
        this.promos = this.promos.filter((e) => e.promoId !== id);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Promotion Deleted Successfully',
          duration: 5000,
        });
        this.initialize();
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Promotion Deletion Failed',
          duration: 5000,
        });
      }
    );
  }
}
