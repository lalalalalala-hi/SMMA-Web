import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/services/category/category.service';
import { FloorService } from 'src/app/services/floor/floor.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrl: './edit-store.component.scss',
})
export class EditStoreComponent implements OnInit {
  editStoreForm!: FormGroup;
  floors: any[] = [];
  categories: any[] = [];
  stores: any[] = [];
  storeDetails: any = {};
  storeId: any;
  name: any;

  constructor(
    private fb: FormBuilder,
    private floor: FloorService,
    private category: CategoryService,
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
      const storeId = params['storeId'];
      this.storeId = storeId;
    });

    this.store.getStoreById(this.storeId).subscribe((res: any) => {
      this.editStoreForm.patchValue(res);
    });

    this.floor.getAllFloors().subscribe((res: any) => {
      this.floors = res;
    });

    this.category.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });

    this.editStoreForm = this.fb.group({
      storeId: [this.storeId],
      name: [''],
      image: [''],
      categoryId: [],
      floorId: [''],
      location: [''],
      description: [''],
      contactNumber: [''],
      openingTime: [''],
      closingTime: [''],
    });
  }

  onSubmit(id: number) {
    if (this.editStoreForm.valid) {
      console.log(this.editStoreForm.value);
      this.store.updateStore(id, this.editStoreForm.value).subscribe(
        (res: any) => {
          this.stores.push(res);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Store Updated Successfully',
            duration: 5000,
          });
          this.router.navigate(['store-list']);
        },
        (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Store Update Failed',
            duration: 5000,
          });
        }
      );
    }
  }
}
