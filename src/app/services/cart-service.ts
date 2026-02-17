import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount = signal(0);
  items: any[] = [];

  addToCart(quantity: number = 1): void {
    
    this.cartCount.update(count => count + quantity);
  }

  removeFromCart(quantity: number = 1): void {
    this.cartCount.update(count => Math.max(0, count - quantity));
  }

  clearCart(): void {
    this.cartCount.set(0);
  }
}
