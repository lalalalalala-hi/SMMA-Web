import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/services/category/category.service';
import { FloorService } from 'src/app/services/floor/floor.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrl: './add-store.component.scss',
})
export class AddStoreComponent implements OnInit {
  addStoreForm!: FormGroup;
  floors: any[] = [];
  categories: any[] = [];
  stores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private floor: FloorService,
    private category: CategoryService,
    private store: StoreService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.floor.getAllFloors().subscribe((res: any) => {
      this.floors = res;
    });

    this.category.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories);
    });

    this.addStoreForm = this.fb.group({
      storeId: [''],
      name: [''],
      image: [''],
      categoryId: [''],
      floorId: [''],
      location: [''],
      description: [''],
      contactNumber: [''],
      openingTime: [''],
      closingTime: [''],
    });
  }

  onSubmit() {
    if (this.addStoreForm.valid) {
      this.store.addStore(this.addStoreForm.value).subscribe(
        (res: any) => {
          this.addStoreForm.reset();
          this.stores.push(res);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Store Added Successfully',
            duration: 5000,
          });
          this.router.navigate(['store-list']);
        },
        (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Store Add Failed',
            duration: 5000,
          });
        }
      );
    }
  }
}
