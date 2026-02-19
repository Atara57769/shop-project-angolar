import { computed, Injectable, signal, effect } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { OrderItemModel } from '../models/order-item-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private STORAGE_KEY = 'shopping_cart';

  cartItems = signal<OrderItemModel[]>([]);
  cartCount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.quantity || 1), 0)
  );

  constructor() {
    const savedCart = localStorage.getItem(this.STORAGE_KEY);
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
    }

 
    effect(() => {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.cartItems())
      );
    });
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  totalPrice = computed(() => {
    const total = this.cartItems().reduce((acc, item) => {
      return acc + item.productPrice * (item.quantity || 1);
    }, 0);

    return parseFloat(total.toFixed(2));
  });


  addToCart(product: ProductModel, quantity: number) {

    this.cartItems.update(prevItems => {
      const existingItem = prevItems.find(p => p.productId === product.id);

      if (existingItem) {
        return prevItems.map(p =>
          p.productId === product.id
            ? { ...p, quantity: (p.quantity || 1) + quantity }
            : p
        );
      }

      const orderProduct: OrderItemModel = {
        orderId: -1,
        productId: product.id,
        quantity: quantity,
        productName: product.name,
        productImageUrl: product.imageUrl,
        productPrice: product.price
      };

      return [...prevItems, orderProduct];
    });
  }


  updateQuantity(productId: number, delta: number) {
    this.cartItems.update(prevItems =>
      prevItems.map(p => {
        if (p.productId === productId) {
          const newQty = (p.quantity || 1) + delta;
          return { ...p, quantity: Math.max(1, newQty) };
        }
        return p;
      })
    );
  }

  // הסרת מוצר
  removeItem(productId: number) {
    this.cartItems.update(prevItems =>
      prevItems.filter(p => p.productId !== productId)
    );
  }
}