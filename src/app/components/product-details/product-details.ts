import { Component, inject, OnInit } from '@angular/core';
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

  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

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
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
        
        // Fallback to mock product
        this.loadMockProduct(id);
      }
    });
  }

  loadMockProduct(id: number): void {
    // Mock products matching the ones in show-products
    const mockProducts: ProductModel[] = [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation. Perfect for music lovers and professionals who need to focus. Features 30-hour battery life, premium sound quality, and comfortable ear cushions.',
        price: 299.99,
        categoryName: 'Electronics',
        categoryId: 1,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        isAvailable: true
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitor. Track your steps, calories, sleep patterns, and more. Water-resistant design with 7-day battery life.',
        price: 199.99,
        categoryName: 'Electronics',
        categoryId: 1,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        isAvailable: true
      },
      {
        id: 3,
        name: 'Laptop Bag',
        description: 'Durable laptop bag with multiple compartments. Fits laptops up to 15.6 inches. Includes padded shoulder straps and water-resistant material.',
        price: 79.99,
        categoryName: 'Accessories',
        categoryId: 2,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        isAvailable: true
      },
      {
        id: 4,
        name: 'USB-C Cable',
        description: 'Fast charging USB-C cable 2 meters. Supports up to 100W power delivery and 10Gbps data transfer. Durable braided design.',
        price: 29.99,
        categoryName: 'Accessories',
        categoryId: 2,
        imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
        isAvailable: true
      },
      {
        id: 5,
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof Bluetooth speaker. IPX7 waterproof rating, 360-degree sound, and 12-hour playtime. Perfect for outdoor adventures.',
        price: 149.99,
        categoryName: 'Electronics',
        categoryId: 1,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        isAvailable: true
      },
      {
        id: 6,
        name: 'Phone Case',
        description: 'Protective phone case with card holder. Military-grade drop protection with built-in card slots for your ID and credit cards.',
        price: 24.99,
        categoryName: 'Accessories',
        categoryId: 2,
        imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
        isAvailable: true
      }
    ];

    const mockProduct = mockProducts.find(p => p.id === id);
    if (mockProduct) {
      this.product = mockProduct;
      console.log('Loaded mock product:', mockProduct);
    } else {
      console.error('Product not found');
      this.router.navigate(['/show-products']);
    }
  }

  addToCart(): void {
    if (this.product) {
      console.log(`Adding ${this.quantity} x ${this.product.name} to cart`);
      // TODO: Implement cart service
    }
  }
}

