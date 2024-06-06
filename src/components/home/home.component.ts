import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { ProductDataState } from '../../stores/product/product.state';
import { setProductData, setProductDataFromApi } from '../../stores/product/product.actions';
import { selectProductModel } from '../../stores/product/product.selector';
import { Observable, Subscription, catchError, defaultIfEmpty, filter, map, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  popularProducts$!: Observable<Product[] | null | undefined>;

  trendingProducts$!: Observable<Product[] | null | undefined>;

  subscription: Subscription[] = [];

  constructor(private productService: ProductsService, private productStore: Store<ProductDataState>) { }

  ngOnInit() {
    this.productStore.dispatch(setProductDataFromApi({ call: this.productService.getAllProducts() }));
    this.trendingProducts$ = this.productStore.select(selectProductModel).pipe(
      filter((data) => !!data));
    this.popularProducts$ = this.trendingProducts$.pipe(
      map((data) => data?.slice(0, 3)));
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
