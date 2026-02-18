import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product-model';
import { CategoryService } from './category-service';
import { PostProductModel } from '../models/post-product-model';
import { ProductFilters } from '../models/product-filters';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:44313/api';
  srvCategory: CategoryService = inject(CategoryService);

  getAllProducts(filters?: ProductFilters): Observable<ProductModel[]> {
    return this.getProducts(filters);
  }

  getAllProductsFilterd(filters?: ProductFilters): Observable<ProductModel[]> {
    return this.getProducts(filters);
  }

  getProducts(filters: ProductFilters = {}): Observable<ProductModel[]> {
    let params = new HttpParams();

    if (filters.categoryIds?.length) {
      filters.categoryIds.forEach((id) => {
        params = params.append('categoryIds', id.toString());
      });
    }

    if (filters.description) {
      params = params.set('description', filters.description);
    }

    if (filters.maxPrice !== undefined) {
      params = params.set('maxPrice', filters.maxPrice.toString());
    }

    if (filters.minPrice !== undefined) {
      params = params.set('minPrice', filters.minPrice.toString());
    }

    if (filters.skip !== undefined) {
      params = params.set('skip', filters.skip.toString());
    }

    if (filters.position !== undefined) {
      params = params.set('position', filters.position.toString());
    }

    return this.http.get<ProductModel[]>(`${this.baseUrl}/products`, { params });
  }

  getProductById(productId: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUrl}/products/${productId}`);
  }

  deleteProductById(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${productId}`);
  }

  updateProduct(updatedProduct: PostProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.baseUrl}/products/${updatedProduct.id}`, updatedProduct);
  }

  addProduct(newProduct: PostProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.baseUrl}/products`, newProduct);
  }
  uploadImage(formData: FormData) {
  return this.http.post<{ url: string }>(
    'https://localhost:44313/api/Upload/upload',
    formData
  );
}
}
