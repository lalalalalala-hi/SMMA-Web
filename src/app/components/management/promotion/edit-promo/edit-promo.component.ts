import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PromoService } from 'src/app/services/promo/promo.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrl: './edit-promo.component.scss',
})
export class EditPromoComponent {
  editPromoForm!: FormGroup;
  stores: any[] = [];
  promoDetails: any = {};
  promoId: any;

  constructor(
    private fb: FormBuilder,
    private promo: PromoService,
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
      const promoId = params['promoId'];
      this.promoId = promoId;
    });

    this.promo.getPromoById(this.promoId).subscribe((res: any) => {
      this.editPromoForm.patchValue(res);
    });

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });

    this.editPromoForm = this.fb.group({
      promotionId: [''],
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
    if (this.editPromoForm.valid) {
      this.promo.updatePromo(id, this.editPromoForm.value).subscribe(
        (res: any) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Promotion Updated Successfully',
            duration: 5000,
          });
          this.router.navigate(['promo-list']);
        },
        (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Promotion Update Failed',
            duration: 5000,
          });
        }
      );
    }
  }
}
