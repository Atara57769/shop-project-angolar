export interface ProductFilters {
  categoryIds?: number[];
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  skip?: number; // number of items to return
  position?: number; // page index (1-based)
  sort?: 'name' | 'price';
  sortDirection?: 'asc' | 'desc';
}
