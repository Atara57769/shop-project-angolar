import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';

import { ProductModel } from '../../models/product-model';
import { ProductFilters } from '../../models/product-filters';
import { ProductService } from '../../services/product-service';
import { Filters } from './filters/filters';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-show-products',
  imports: [ButtonModule,CardModule, CurrencyPipe, Filters, ProgressSpinnerModule],
  templateUrl: './show-products.html',
  styleUrls: ['./show-products.scss'],
})
export class ShowProducts implements OnInit {
  private productService = inject(ProductService);
  private cartSrvice = inject(CartService);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  products: ProductModel[] = [];
  loading = true;
  errorMessage = '';

  private readonly pageSize = 100;
  private currentFilters: ProductFilters = { position: 1, skip: this.pageSize, sort: 'name', sortDirection: 'asc' };

  ngOnInit(): void {
    this.loadProducts();
  }

  onFiltersChange(filters: ProductFilters): void {
    this.currentFilters = {
      ...this.currentFilters,
      ...filters,
      position: 1,
      skip: this.pageSize,
    };
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getProducts(this.currentFilters).subscribe({
      next: (products) => {
        const normalizedProducts = Array.isArray(products) ? products : [];
        this.products = normalizedProducts.length ? this.applySort(normalizedProducts) : [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.products = [];
        this.loading = false;
        this.errorMessage = 'Unable to load products from the shop API.';
      },
    });
  }

  private applySort(products: ProductModel[]): ProductModel[] {
    if (this.currentFilters.sort === 'price') {
      return [...products].sort((a, b) => a.price - b.price);
    }
    return products;
  }

  goToDetails(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }

  addToCart(product: ProductModel): void {
    this.cartSrvice.addToCart(product, 1);
  }

}
