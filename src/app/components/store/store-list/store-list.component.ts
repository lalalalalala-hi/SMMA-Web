import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/services/category/category.service';
import { FloorService } from 'src/app/services/floor/floor.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss',
})
export class StoreListComponent implements OnInit {
  stores: any[] = [];
  floors: any[] = [];
  categories: any[] = [];

  constructor(
    private store: StoreService,
    private floor: FloorService,
    private category: CategoryService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.store.getAllStores().subscribe(
      (res: any) => {
        this.stores = res;
        console.log(this.stores);
      },
      (err) => {
        console.log(err);
      }
    );

    this.floor.getAllFloors().subscribe(
      (res: any) => {
        this.floors = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.category.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        console.log(this.categories);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCategoryName(id: string) {
    return this.categories.find((c) => c.categoryId === id)?.categoryName;
  }

  deleteStore(id: number) {
    this.store.deleteStore(id).subscribe(
      (res: any) => {
        this.stores = this.stores.filter((s) => s.storeId !== id);
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
