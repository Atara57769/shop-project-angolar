// import { Component, OnInit, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { CartService } from '../../services/cart-service';

// @Component({
//        selector: 'app-cart',
//        imports: [],
//        templateUrl: './cart.html',
//        styleUrls: ['./cart.scss'],
// })

// export class Cart implements OnInit {
  
//   cartService = inject(CartService);

//   router = inject(Router);
//   items: any[] = this.cartService.items;


//   ngOnInit(): void {
//     // load cart items from a service when available
//     this.items = this.cartService.items;
//   }

//   goBack(): void {
//     this.router.navigate(['/show-products']);
//   }

// }

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { ProductModel } from '../../models/product-model';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { OrderDetails } from '../account-details/order-details/order-details';
import { OrderItemModel } from '../../models/order-item-model';
import { Router } from '@angular/router';

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
    this.router.navigate(['/checkout']);
  }
}

