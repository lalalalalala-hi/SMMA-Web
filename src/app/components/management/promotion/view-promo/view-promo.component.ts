import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromoService } from 'src/app/services/promo/promo.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-view-promo',
  templateUrl: './view-promo.component.html',
  styleUrl: './view-promo.component.scss',
})
export class ViewPromoComponent {
  promoDetails: any = [];
  stores: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private promo: PromoService,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.route.queryParams.subscribe((params) => {
      const promoId = params['promoId'];
      console.log(promoId);

      this.promo.getPromoById(promoId).subscribe((res: any) => {
        this.promoDetails = res;
        console.log(this.promoDetails);
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
