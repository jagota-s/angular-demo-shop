import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product';
import { Store } from '@ngrx/store';
import { ProductDataStore } from '../../../stores/product/product.state';
import { deleteProductFromApi } from '../../../stores/product/product.actions';
import { selectProductModel } from '../../../stores/product/product.selector';
import { Observable, filter, tap } from 'rxjs';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {

  productList: Product[] = [];
  productDeleteMessage = '';

  productList$!: Observable<Product[] | null | undefined>;

  constructor(private productService: ProductsService, private productStore: Store<ProductDataStore>) { }

  ngOnInit() {
    this.getLatestProducts();
  }


  onProductDelete(id: string) {
    // this.productService.deleteProduct(id).subscribe((result) => {
    //   if (result) {
    //     this.productDeleteMessage = "Product deleted successfully";
    //     this.getLatestProducts();
    //   }
    // });
    // setTimeout(() => {
    //   this.productDeleteMessage = '';
    // }, 3000);
    this.productStore.dispatch(deleteProductFromApi({ id: id }));
    this.getLatestProducts();
    // setTimeout(() => {
    //   this.getLatestProducts();
    // }, 1000);

  }

  getLatestProducts() {
    this.productList$ = this.productStore.select(selectProductModel).pipe(
      filter((data) => !!data),
      tap((data) => { console.log(data) }))
  }



}
