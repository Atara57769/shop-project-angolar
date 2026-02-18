import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { ProductModel } from '../../models/product-model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { CartService } from '../../services/cart-service';


@Component({
  selector: 'app-product-details',
  imports: [
    ImageModule, 
    CardModule, 
    ButtonModule, 
    InputNumber, 
    FormsModule, 
    CurrencyPipe, 
    ProgressSpinnerModule,
    TagModule,
    DividerModule
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {

  quantity: number = 1;
  loading: boolean = true;
  product: ProductModel | null = null;
  errorMessage = '';

  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cartService = inject(CartService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      this.loadProduct(+productId);
    } else {
      console.error('No product ID provided');
      this.router.navigate(['/show-products']);
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.product = null;
        this.errorMessage = 'Unable to load this product from the shop API.';
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    if (this.product) {
      console.log(`Adding ${this.quantity} x ${this.product.name} to cart`);
      this.cartService.addToCart(
        ...[this.product],
        this.quantity
      )
    }
  }
}

