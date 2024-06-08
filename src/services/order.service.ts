import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  orderNow(order: Order) {
    return this.http.post('http://localhost:3000/orders', order);
  }

  getOrders(userId: string) {
    return this.http.get('http://localhost:3000/orders?userId=' + userId);
  }


}
