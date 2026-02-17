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

  getAllProducts(filters: any): Observable<ProductModel[]> {
    let params = {
      search: filters.searchTerm || '',
      categoryId: filters.categoryId || '',
      minPrice: filters.minPrice || 0,
      maxPrice: filters.maxPrice || 200,
      sort: filters.sortBy || ''
    };
    return this.http.get<ProductModel[]>(`${this.baseUrl}/products`,{ params });
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
