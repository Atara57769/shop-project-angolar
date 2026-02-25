import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { forkJoin, map, of } from 'rxjs';

import { CartService } from '../../services/cart-service';
import { OrderItemModel } from '../../models/order-item-model';
import { AuthService } from '../../services/auth-service';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DataViewModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  private cartService = inject(CartService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private productService = inject(ProductService);

  products = this.cartService.cartItems;
  totalPrice = this.cartService.totalPrice;
  unavailableProductIds = signal<number[]>([]);
  availabilityError = signal(false);

  updateQuantity(item: OrderItemModel, delta: number) {
    this.cartService.updateQuantity(item.productId, delta);
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  checkout() {
    const cartItems = this.products();

    this.unavailableProductIds.set([]);
    this.availabilityError.set(false);

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    if (!this.authService.isUserConnect()) {
      alert('Please sign in to checkout');
      this.router.navigate(['/sign-in']);
      return;
    }

    this.checkProductsAvailability(cartItems).subscribe({
      next: (unavailableProducts) => {
        if (unavailableProducts.length) {
          this.unavailableProductIds.set(unavailableProducts);
          return;
        }

        this.router.navigate(['/checkout']);
      },
      error: () => {
        this.availabilityError.set(true);
      }
    });
  }

  isUnavailable(productId: number) {
    return this.unavailableProductIds().includes(productId);
  }

  private checkProductsAvailability(items: OrderItemModel[]) {
    if (!items.length) {
      return of<number[]>([]);
    }

    return forkJoin(
      items.map(item =>
        this.productService.getProductById(item.productId).pipe(
          map(product => ({ product, cartItem: item }))
        )
      )
    ).pipe(
      map(results =>
        results
          .filter(({ product }) => product?.isAvailable === false)
          .map(({ cartItem }) => cartItem.productId)
      )
    );
  }
}

