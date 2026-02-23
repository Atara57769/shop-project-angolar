import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
import { ProductFilters } from '../../../models/product-filters';

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
    InputGroupModule,
  ],
  templateUrl: './filters.html',
  styleUrls: ['./filters.scss'],
})
export class Filters implements OnInit {
  @Output() filtersChange = new EventEmitter<ProductFilters>();

  search: string = '';
  sortBy: ProductFilters['sort'] = 'name';
  sortDirection: ProductFilters['sortDirection'] = 'asc';

  categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);
  categories: CategoryModel[] = [];
  selectedCategoriesIds: number[] = [];

  readonly minLimit = 0;
  readonly maxLimit = 130;

  rangeValues: number[] = [this.minLimit, this.maxLimit];
  private priceTouched = false;

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.cdr.detectChanges();
      },
      error: () => {
        this.categories = [];
      },
    });
  }

  onSearch() {
    this.emitFilters();
  }

  onCategoryChange() {
    this.emitFilters();
  }

  onPriceChange(values: number[]) {
    if (!values || values.length !== 2) {
      return;
    }
    this.priceTouched = true;
    this.rangeValues = values;
    this.emitFilters();
  }

  onSortChange(sortBy: ProductFilters['sort'], sortDirection: ProductFilters['sortDirection']) {
    this.sortBy = sortBy;
    this.sortDirection = sortDirection;
    this.emitFilters();
  }

  private emitFilters() {

    const [minRange, maxRange] = this.rangeValues;

    const filters: ProductFilters = {
      description: this.search.trim() || undefined,
      categoryIds: this.selectedCategoriesIds.length ? this.selectedCategoriesIds : undefined,
      minPrice: this.priceTouched ? minRange : undefined,
      maxPrice: this.priceTouched ? maxRange : undefined,
      sort: this.sortBy,
      sortDirection: this.sortDirection,
    };

    this.filtersChange.emit(filters);
  }
}
