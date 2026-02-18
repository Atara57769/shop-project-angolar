import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';
import { InputGroupModule } from 'primeng/inputgroup';

import { CategoryService } from '../../../services/category-service';
import { ProductService } from '../../../services/product-service';
import { CategoryModel } from '../../../models/category-model';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    CardModule,
    DividerModule,
    SliderModule,
    TagModule,
    InputGroupModule
  ],
  templateUrl: './filters.html',
  styleUrls: ['./filters.scss']
})
export class Filters implements OnInit {

  productService = inject(ProductService);
  categoryService = inject(CategoryService);

  search: string = '';
  sortBy = signal<string>('new');

  categories: CategoryModel[] = [];
  selectedCategoriesIds = signal<number[]>([]);

  readonly minLimit = 0;
  readonly maxLimit = 200;

  rangeValues = signal<number[]>([this.minLimit, this.maxLimit]);

    constructor() {
    //ירוץ כאשר אחד הסיגנלים 
    effect(() => {
      // רישום התלות בסיגנלים
      this.sortBy();
      this.selectedCategoriesIds();
      this.rangeValues();

      // הרצת הפילטור
      this.applyAllFilters();
    });
  }

  ngOnInit(): void {
    // טעינת הקטגוריות מהסרוויס בזמן האתחול
    this.categories = this.categoryService.categories;
  }

  // =========================
  // פונקציה מרכזית שמאגדת הכל
  // =========================
  applyAllFilters() {

    const filters = {
      searchTerm: this.search,
      categoryId: this.selectedCategoriesIds(),
      minPrice: this.rangeValues()[0],
      maxPrice: this.rangeValues()[1],
      sortBy: this.sortBy()
    };

    this.productService.getAllProducts(filters)
      .subscribe(res => {
        console.log('Filtered products:', res);
      });
  }

  // =========================
  // פונקציות ייעודיות
  // =========================

  filterBySearch() {
    this.applyAllFilters();
    //בדיקה שמופעלת הפונקציה
    console.log('חיפוש');
  }

  filterBySort(value: string) {
    this.sortBy.set(value);
    //בדיקה שמופעלת הפונקציה
    console.log('מיון');
  }

  filterByCategory() {
    this.applyAllFilters();
    //בדיקה שמופעלת הפונקציה
    console.log('קטגוריה');
  }

  filterByPrice() {
    this.applyAllFilters();
    //בדיקה שמופעלת הפונקציה
    console.log('מחיר');
  }
}



