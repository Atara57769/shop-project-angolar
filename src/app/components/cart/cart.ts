import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
       selector: 'app-cart',
       imports: [],
       templateUrl: './cart.html',
       styleUrls: ['./cart.scss'],
})

export class Cart implements OnInit {
  
  cartService = inject(CartService);

  router = inject(Router);
  items: any[] = this.cartService.items;


  ngOnInit(): void {
    // load cart items from a service when available
    this.items = this.cartService.items;
  }

  goBack(): void {
    this.router.navigate(['/show-products']);
  }
  
}
