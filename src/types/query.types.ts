export interface ProductQueryParams {
  q?: string;
  category?: string;
  limit?: number;
  skip?: number;
  sortBy?: 'price';
  order?: 'asc' | 'desc';
}