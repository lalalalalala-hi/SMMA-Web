import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { FloorService } from 'src/app/services/floor/floor.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrl: './add-store.component.scss',
})
export class AddStoreComponent implements OnInit {
  addStoreForm!: FormGroup;
  floors: any[] = [];
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private floor: FloorService,
    private category: CategoryService
  ) {}

  ngOnInit(): void {
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
      },
      (err) => {
        console.log(err);
      }
    );

    this.addStoreForm = this.fb.group({
      storeId: [''],
      name: [''],
      image: [''],
      category: [''],
      floor: [''],
      location: [''],
      description: [''],
      contactNumber: [''],
      openingTime: [''],
      closingTime: [''],
    });
  }

  onSubmit() {
    if (this.addStoreForm.valid) {
      console.log(this.addStoreForm.value);
    }
  }
}
