import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  addToCart(product: Product, quanity: number) {
    {
      let cart = [];
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart')!);
      }
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartCount.next(cart.length);
    }
  }

  removeFromCart(id: string, quantity: number) {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart')!);
    }
    cart = cart.filter((product: Product) => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartCount.next(cart.length);
  }



}
