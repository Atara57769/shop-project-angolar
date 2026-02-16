
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CategoryService } from '../../../services/category-service';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';
import { CategoryModel } from '../../../models/category-model';
import { InputGroupModule } from 'primeng/inputgroup';

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
    TagModule,  InputGroupModule,
    InputTextModule
  ],
  templateUrl: './filters.html',
  styleUrls: ['./filters.scss']
})
export class Filters implements OnInit {

  search: string = '';

  sortBy = signal<string>('new');

  // פונקציה לעדכון (אופציונלי, אפשר גם ישירות ב-HTML)
  // setSort(value: string) {
  //   this.sortBy.set(value);
  //   console.log('Sort by set to:', value);
  // }
  
  categoryService = inject(CategoryService);

  categories: CategoryModel[] = [];
  selectedCategories: CategoryModel[] = [];

  readonly minLimit = 0;
  readonly maxLimit = 200;

  rangeValues = signal<number[]>([this.minLimit, this.maxLimit]);

  ngOnInit() {
    // Load categories from service
    this.categories = this.categoryService.categories;
    
    // Optional: Select default category
    // if (this.categories && this.categories.length > 1) {
    //   this.selectedCategories = [this.categories[1]];
    // }
  }
}
