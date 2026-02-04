import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { CategoryService } from './category-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductModel[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High performance laptop',
      price: 1200,
      category: 'Electronics',
      categoryId: 1,
      imageUrl: 'assets/images/laptop.png'
    },
    {
      id: 2,
      name: 'Headphones',
      description: 'Noise cancelling headphones',
      price: 200,
      category: 'Accessories',
      categoryId: 2,
      imageUrl: 'assets/images/headphones.png'
    }
  ];
  srvCategory:CategoryService=inject(CategoryService);
  getAllProducts() {
    return [...this.products];

  }
  getProductById(productId: number) {
    return this.products.find(p => p.id === productId);
  }
  deleteProductById(productId: number) {
    this.products = this.products.filter(p => p.id !== productId);
  }
  updateProduct(updatedProduct: ProductModel) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === updatedProduct.id) {
        this.products[i] = updatedProduct;
        break;
      }
    }
  }
  addProduct(newProduct: ProductModel) {
    newProduct.categoryId=this.srvCategory.getIdByName(newProduct.category) ?? 0;
    this.products.push(newProduct);
    console.log('Product added:', this.products);
  }
}
