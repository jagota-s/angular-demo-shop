import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { ProductDataState } from '../../stores/product/product.state';
import { setProductData, setProductDataFromApi } from '../../stores/product/product.actions';
import { selectProductModel } from '../../stores/product/product.selector';
import { Subscription, catchError, filter, map, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  popularProducts: Product[] = [];

  trendingProducts: Product[] = [];

  subscription: Subscription[] = [];

  constructor(private productService: ProductsService, private productStore: Store<ProductDataState>) { }

  ngOnInit() {
    this.productStore.dispatch(setProductDataFromApi({ call: this.productService.getAllProducts() }));
    const sub = this.productStore.select(selectProductModel).pipe(
      filter((data) => !!data),
      map((data) => {
        if (data !== null) {
          this.popularProducts = data?.slice(0, 4);
          this.trendingProducts = data;
        }
      }), // move this to effects
      catchError((error) => {
        console.log("Error in getting products", error);
        return error;
      }))
      .subscribe();
    this.subscription.push(sub);
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
