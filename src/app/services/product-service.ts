import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { CategoryService } from './category-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:44313/api';
  srvCategory: CategoryService = inject(CategoryService);

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.baseUrl}/products`);
  }

  getProductById(productId: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUrl}/products/${productId}`);
  }

  deleteProductById(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${productId}`);
  }

  updateProduct(updatedProduct: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.baseUrl}/products/${updatedProduct.id}`, updatedProduct);
  }

  addProduct(newProduct: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.baseUrl}/products`, newProduct);
  }
}
