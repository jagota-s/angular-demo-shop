import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount = new BehaviorSubject<number>(0);
  cartItems = new BehaviorSubject<Product[]>([]);


  constructor(private http: HttpClient) { }

  addToLocalCart(product: Product, quanity: number) {
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

  // removeFromCart(id: string) {
  //   if (!localStorage.getItem('loggedInUser')) {
  //     // Handle local cart for non-logged-in users
  //     let cart = [];
  //     if (localStorage.getItem('cart')) {
  //       cart = JSON.parse(localStorage.getItem('cart')!);
  //       cart = cart.filter((product: Product) => product.id !== id);
  //       localStorage.setItem('cart', JSON.stringify(cart));
  //       this.cartCount.next(cart.length);
  //     }
  //   } else {
  //     // Handle server-side cart for logged-in users
  //     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
  //     const userID = loggedInUser[0].id;

  //     this.http.delete(`http://localhost:3000/cart/${id}`).subscribe();
  //   }
  // }



  addToCart(cartData: Cart): Observable<Cart> {
    return this.http.post<Cart>('http://localhost:3000/cart', cartData);
  }

  updateCart(cartData: Cart): Observable<Cart> {
    return this.http.put<Cart>(`http://localhost:3000/cart/${cartData.id}`, cartData);
  }

  getCartItems(userId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=${userId}`);
  }
  updateCartCount(userId: string) {
    this.getCartItems(userId).pipe(
      map((data) => {
        console.log("check data value", data);
        if (data.length > 0) {
          return data[0].product.length;
        } else {
          return 0;
        }
      })
    ).subscribe(
      (count) => {
        this.cartCount.next(count);
      }
    );
  }

}
