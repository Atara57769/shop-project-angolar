import { inject, Injectable } from '@angular/core';
import { CategoryModel } from '../models/category-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:44313/api';



getCategoryNames(categories:CategoryModel[]): string[] {
     return categories.map(c => c.name);
  }
getCategories() {
    return this.http.get<CategoryModel[]>(`${this.baseUrl}/categories`)
  }
 getIdByName(categoryName: string,categories:CategoryModel[]): number {
    return categories.find(c => c.name === categoryName)?.id ?? -1;
  }
}