import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: CategoryModel[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Accessories' }

  ];
  
  getCategoryNames() {
    const categoriesNames = this.categories.map(cat => cat.name);
    console.log('Categories Names:', categoriesNames);
    return categoriesNames;
  }
  getIdByName(categoryName: string){
    const category = this.categories.find(cat => cat.name === categoryName);
    return category?.id;
  } 
}