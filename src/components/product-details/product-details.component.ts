import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription, catchError, filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { USER_DATA_STORE_NAME, userDataStore } from '../../stores/user/users.state';
import { selectProductModel } from '../../stores/product/product.selector';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productData: Product | undefined;
  productQuantity = 1;
  removeCart = false;
  private subscriptions: Subscription[] = [];

  constructor(private productService: ProductsService, private activeRoute: ActivatedRoute, private cartService: CartService, private store: Store<userDataStore>) { }

  ngOnInit(): void {
    const sub = this.activeRoute.params.subscribe((params) => {
      const productId = params['id'];
      this.store.select(selectProductModel).pipe(
        filter((data) => !!data),
        map((data) => {
          this.productData = data?.find((product) => product.id?.toString() === productId);
          return this.productData;
        }),
        catchError((error) => {
          console.log("Error in getting product", error);
          return error;
        })
      ).subscribe();
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

  removeFromCart(id: string) {
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, this.productQuantity);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
