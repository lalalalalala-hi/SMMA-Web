import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PromoService } from 'src/app/services/promo/promo.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrl: './add-promo.component.scss',
})
export class AddPromoComponent {
  addPromoForm!: FormGroup;
  stores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private promo: PromoService,
    private store: StoreService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });

    this.addPromoForm = this.fb.group({
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

  onSubmit() {
    if (this.addPromoForm.valid) {
      console.log(this.addPromoForm.value);
      this.promo.addPromo(this.addPromoForm.value).subscribe(
        (res: any) => {
          this.addPromoForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Promotion Added Successfully',
            duration: 5000,
          });
          this.router.navigate(['promo-list']);
        },
        (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Promotion Add Failed',
            duration: 5000,
          });
        }
      );
    }
  }
}
