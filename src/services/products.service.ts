import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, catchError, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  message = new Subject<string>();
  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post<Product>('http://localhost:3000/products', data);
  }

  getAllProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: string) {
    return this.http.delete<{}>(`http://localhost:3000/products/${id}`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(id: string, data: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${id}`, data);
  }

  searchProduct(searchTerm: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${searchTerm}`);
    //return this.apiService.makeCall('GET', `http://localhost:3000/products?q=${searchTerm}`);
  }


  // // API service
  // makeCall(type: 'POST' | 'GET' | 'PUT' | 'DELETE', url: string, payload: any) {
  //   switch (type) {
  //     case 'POST':
  //       return this.http.post(url, payload).pipe(
  //         catchError((error) => {
  //           this.handleErrors(error);
  //           return error;
  //         })
  //       );
  //     case 'GET':
  //       return this.http.get(url).pipe(
  //         catchError((error) => {
  //           this.handleErrors(error);
  //           return error;
  //         })
  //       );
  //     case 'PUT':
  //       return this.http.put(url, payload).pipe(
  //         catchError((error) => {
  //           this.handleErrors(error);
  //           return error;
  //         })
  //       );
  //     case 'DELETE':
  //       return this.http.delete(url).pipe(
  //         catchError((error) => {
  //           this.handleErrors(error);
  //           return error;
  //         })
  //       );
  //   }
  // }

  // handleErrors(error: any) {

  // }
}
