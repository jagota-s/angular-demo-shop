import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserDataState, userDataStore } from '../../../stores/user/users.state';
import { setUserDataFromApi } from '../../../stores/user/users.actions';
import { selectUserData, selectUserModel } from '../../../stores/user/users.selectors';
import { Subscription, catchError, filter, map, tap } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product';
import { Cart } from '../../../models/cart';
import { CartDataStore } from '../../../stores/cart/cart.state';
import { addToCartFromApi, updateCart, updateCartFromApi } from '../../../stores/cart/cart.action';
import { selectCartModel } from '../../../stores/cart/cart.selectors';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',


})
export class UserAuthComponent implements OnInit {

  showLogin = true;
  authErrorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<userDataStore>,
    private cartService: CartService,
    private cartStore: Store<CartDataStore>) { }

  subscription: Subscription[] = [];

  ngOnInit(): void {
    if (localStorage) {
      if (localStorage.getItem('loggedInUser')) {
        this.router.navigate(['/']);
      }
    }
  }

  onUserLogin(loginForm: NgForm) {
    this.store.dispatch(setUserDataFromApi({
      call: this.userService.userLogin(loginForm.value)
    }));
    const sub = this.store.select(selectUserModel).pipe(
      filter((data) => !!data),
      tap((data) => {
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        this.localCartToDb();
        this.router.navigate(['/']);
      })
    ).subscribe();

    this.subscription.push(sub);
  }

  onUserSignUp(signUpForm: NgForm) {
    this.store.dispatch(setUserDataFromApi({ call: this.userService.userSignUp(signUpForm.value) }));
    const sub = this.store.select(selectUserModel).pipe(
      filter((data) => !!data),
      tap((data) => {
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        this.router.navigate(['/']);
      })
    ).subscribe();
    this.subscription.push(sub);
  }

  showUserSignInForm() {
    this.showLogin = true;
  }

  showUserSignUpForm() {
    this.showLogin = false;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  localCartToDb() {
    const localCart = JSON.parse(localStorage.getItem('cart')!);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
    const userID = loggedInUser[0].id;
    if (localCart) {
      // Fetch the existing cart for the user
      this.cartService.getCartItems(userID).subscribe(
        (existingCarts) => {
          if (existingCarts.length > 0) {
            // Update the existing cart with the local cart items
            const existingCart = existingCarts[0];
            localCart.forEach((product: Product) => {
              existingCart.product.push(product);
            });
            this.cartStore.dispatch(updateCartFromApi({ call: this.cartService.updateCart(existingCart) }));
          } else {
            // Create a new cart with the local cart items
            const cartData: Cart = { product: localCart, userId: userID };
            this.cartStore.dispatch(addToCartFromApi({ call: this.cartService.addToCart(cartData) }));
          }
        }
      );
      localStorage.removeItem('cart');
      const sub = this.cartStore.select(selectCartModel).pipe(
        filter((data) => !!data),
        tap((data) => {
          console.log('data', data);
          const existingCart = data![0];
          localCart.forEach((product: Product) => {
            existingCart.product.push(product);
            console.log('existingCart', existingCart);
          })
        })
      ).subscribe();

      //this.cartService.updateCartCount(userID);
    }
  }



}
