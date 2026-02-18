

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { ProductModel } from '../../models/product-model';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { OrderDetails } from '../account-details/order-details/order-details';
import { OrderItemModel } from '../../models/order-item-model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

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

  products = this.cartService.cartItems;
  totalPrice = this.cartService.totalPrice;

  updateQuantity(item: OrderItemModel, delta: number) {
    this.cartService.updateQuantity(item.productId, delta);
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  checkout() {
    const total = this.totalPrice();
    if (this.products().length === 0) {
      alert('Your cart is empty');
      return;
    }
    if (!this.authService.isUserConnect()) {
      alert('Please sign in to checkout');
      this.router.navigate(['/sign-in']);
      return;
    }

    this.router.navigate(['/checkout']);
  }
}

