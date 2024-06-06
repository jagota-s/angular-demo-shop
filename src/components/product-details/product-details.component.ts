import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription, catchError, filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { USER_DATA_STORE_NAME, userDataStore } from '../../stores/user/users.state';
import { selectProductModel } from '../../stores/product/product.selector';

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

  constructor(private productService: ProductsService, private activeRoute: ActivatedRoute, private cartService: CartService, private store: Store<userDataStore>) { }

  ngOnInit(): void {
    const sub = this.activeRoute.params.subscribe((params) => {
      const productId = params['id'];
      this.productData$ = this.store.select(selectProductModel).pipe(
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
    this.cartService.addToCart(product, this.productQuantity);
  }

  removeFromCart(id: string | undefined) {
    if (id) {
      // this.cartService.removeFromCart(id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => { sub.unsubscribe(); });
  }
}
