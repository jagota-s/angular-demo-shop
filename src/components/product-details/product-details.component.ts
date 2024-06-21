import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription, catchError, filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { USER_DATA_STORE_NAME, userDataStore } from '../../stores/user/users.state';
import { selectProductModel } from '../../stores/product/product.selector';
import { Cart } from '../../models/cart';
import { CartDataStore } from '../../stores/cart/cart.state';
import { addToCartFromApi, updateCartFromApi } from '../../stores/cart/cart.action';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productData$: Observable<Product | undefined> | undefined;
  productQuantity = 1;
  removeCart = false;
  private subscriptions: Subscription[] = [];

  constructor(private productService: ProductsService, private activeRoute: ActivatedRoute, private cartService: CartService, private userStore: Store<userDataStore>, private cartStore: Store<CartDataStore>) { }

  ngOnInit(): void {
    const sub = this.activeRoute.params.subscribe((params) => {
      const productId = params['id'];
      this.productData$ = this.userStore.select(selectProductModel).pipe(
        filter((data) => !!data),
        map((data) => {
          return data?.find((product) => product.id?.toString() === productId);
        })
      );
    });
    this.subscriptions.push(sub);
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 10 && val === '+') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && val === '-') {
      this.productQuantity--;
    }
  }

  addToCart(product: Product) {
    const productCopy: Product = { ...product, quantity: this.productQuantity };
    if (!localStorage.getItem('loggedInUser')) {
      this.cartService.addToLocalCart(productCopy, this.productQuantity);
    } else {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
      const userID = loggedInUser[0].id;
      this.cartService.getCartItems(userID).subscribe(
        (existingCarts) => {
          if (existingCarts.length > 0) {
            const existingCart = existingCarts[0];
            existingCart.product.push(productCopy);
            // this.cartService.updateCart(existingCart).subscribe((data) => {
            //   this.cartService.updateCartCount(userID);
            // });
            this.cartStore.dispatch(updateCartFromApi({ call: this.cartService.updateCart(existingCart) }));
          } else {
            const cartData: Cart = { product: [productCopy], userId: userID };
            // this.cartService.addToCart(cartData).subscribe(() => {
            //   this.cartService.updateCartCount(userID);
            // });

            this.cartStore.dispatch(addToCartFromApi({ call: this.cartService.addToCart(cartData) }));

          }
        }
      );
    }
    this.removeCart = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => { sub.unsubscribe(); });
  }


  removeFromCart(id: string | undefined) {
    if (!localStorage.getItem('loggedInUser')) {
      // Handle local cart for non-logged-in users
      let cart = [];
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart')!);
        cart = cart.filter((product: Product) => product.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartService.cartCount.next(cart.length);
      }
    } else {
      // Handle server-side cart for logged-in users
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
      const userID = loggedInUser[0].id;
      this.cartService.getCartItems(userID).subscribe(
        (data) => {
          if (data.length > 0) {
            const existingCart = data[0];
            existingCart.product = existingCart.product.filter((product: Product) => product.id !== id);
            // this.cartService.updateCart(existingCart).subscribe(() => {
            //   this.cartService.updateCartCount(userID);
            // });
            this.cartStore.dispatch(updateCartFromApi({ call: this.cartService.updateCart(existingCart) }));
          }
        });
      //this.cartService.updateCartCount(userID);
    }
    this.removeCart = false;
  }

}
