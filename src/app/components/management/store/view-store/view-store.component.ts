import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-view-store',
  templateUrl: './view-store.component.html',
  styleUrl: './view-store.component.scss',
})
export class ViewStoreComponent implements OnInit {
  storeDetails: any = [];
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private category: CategoryService
  ) {}

  ngOnInit(): void {
    this.intialize();
  }

  intialize() {
    this.route.queryParams.subscribe((params) => {
      const storeId = params['storeId'];

      this.store.getStoreById(storeId).subscribe((res: any) => {
        this.storeDetails = res;
      });
    });

    this.category.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  getCategoryName(id: string) {
    return this.categories.find((c: any) => c.categoryId === id)?.categoryName;
  }
}
