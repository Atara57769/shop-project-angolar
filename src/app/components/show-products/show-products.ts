
import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProductModel } from '../../models/product-model';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../services/product-service';
import { Filters } from './filters/filters';
import { Router } from '@angular/router';

@Component({
       selector: 'app-show-products',
       imports: [CardModule,ButtonModule,CurrencyPipe,Filters],
       templateUrl: './show-products.html',
       styleUrls: ['./show-products.scss'],
})

export class ShowProducts implements OnInit {

  productService = inject(ProductService);
  router = inject(Router);

  products: ProductModel[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
   this.products=[
  {
    id: 1,
    name: "Laptop",
    description: "Gaming laptop",
    price: 2500,
    categoryName: "Electronics",
    categoryId: 1,
    imageUrl: "/laptop.jpg",
    isAvailable: true
  },
  {
    id: 2,
    name: "Toy Car",
    description: "Remote control car",
    price: 120,
    categoryName: "Toys",
    categoryId: 2,
    imageUrl: "/car.jpg",
    isAvailable: true
  },
  {
    id: 3,
    name: "Headphones",
    description: "Wireless headphones",
    price: 300,
    categoryName: "Electronics",
    categoryId: 1,
    imageUrl: "/headphones.jpg",
    isAvailable: false
  },{
    id: 1,
    name: "Laptop",
    description: "Gaming laptop",
    price: 2500,
    categoryName: "Electronics",
    categoryId: 1,
    imageUrl: "/laptop.jpg",
    isAvailable: true
  },
  {
    id: 2,
    name: "Toy Car",
    description: "Remote control car",
    price: 120,
    categoryName: "Toys",
    categoryId: 2,
    imageUrl: "/car.jpg",
    isAvailable: true
  },
  {
    id: 3,
    name: "Headphones",
    description: "Wireless headphones",
    price: 300,
    categoryName: "Electronics",
    categoryId: 1,
    imageUrl: "/headphones.jpg",
    isAvailable: false
  },{
    id: 1,
    name: "Laptop",
    description: "Gaming laptop",
    price: 2500,
    categoryName: "Electronics",
    categoryId: 1,
    imageUrl: "/laptop.jpg",
    isAvailable: true
  },
  {
    id: 2,
    name: "Toy Car",
    description: "Remote control car",
    price: 120,
    categoryName: "Toys",
    categoryId: 2,
    imageUrl: "/car.jpg",
    isAvailable: true
  },
  {
    id: 3,
    name: "Headphones",
    description: "Wireless headphones",
    price: 300,
    categoryName: "Electronics",
    categoryId: 1,
    imageUrl: "/headphones.jpg",
    isAvailable: false
  }
];
  }

  loadMockProducts(): void {

    
    console.log('Mock products loaded:', this.products.length);
  }

  goToDetails(productId: number): void {
    // Navigate to product details page
    this.router.navigate(['/product-details', productId]);
  }
}