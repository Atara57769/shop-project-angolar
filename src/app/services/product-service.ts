import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { CategoryService } from './category-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:44313/api';
  srvCategory: CategoryService = inject(CategoryService);

  // =========================
  // פונקציה מרכזית (הקוד הקיים שלך - נשמר)
  // =========================
  getAllProducts(filters: any): Observable<ProductModel[]> {

    let params = new HttpParams()
      .set('search', filters.searchTerm || '')
      .set('categoryId', (filters.categoryId || []).join(','))
      .set('minPrice', filters.minPrice ?? 0)
      .set('maxPrice', filters.maxPrice ?? 200)
      .set('sort', filters.sortBy || '');

    return this.http.get<ProductModel[]>(`${this.baseUrl}/products`, { params });
  }

  // =========================
  // פונקציות ייעודיות לכל פילטר
  // =========================

  getProductsBySearch(searchTerm: string): Observable<ProductModel[]> {
    return this.getAllProducts({
      searchTerm,
      categoryId: [],
      minPrice: 0,
      maxPrice: 200,
      sortBy: ''
    });
  }

  getProductsBySort(sortBy: string): Observable<ProductModel[]> {
    return this.getAllProducts({
      searchTerm: '',
      categoryId: [],
      minPrice: 0,
      maxPrice: 200,
      sortBy
    });
  }

  getProductsByCategory(categoryIds: number[]): Observable<ProductModel[]> {
    return this.getAllProducts({
      searchTerm: '',
      categoryId: categoryIds,
      minPrice: 0,
      maxPrice: 200,
      sortBy: ''
    });
  }

  getProductsByPrice(minPrice: number, maxPrice: number): Observable<ProductModel[]> {
    return this.getAllProducts({
      searchTerm: '',
      categoryId: [],
      minPrice,
      maxPrice,
      sortBy: ''
    });
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
