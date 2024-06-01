import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Subject, catchError, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  message = new Subject<string>();
  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post<Product>('http://localhost:3000/products', data).pipe(
      filter((response) => response !== null),
      map((response) => this.message.next('Product added successfully')),
      catchError(async (error) => this.message.next('Product not added'))
    ).subscribe();
  }

  getAllProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(`http://localhost:3000/products/${id}`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(id: string, data: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${id}`, data);
  }

  getPopularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3');
  }

  getTrendingProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProduct(searchTerm: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${searchTerm}`);
  }
}
