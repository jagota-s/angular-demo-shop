import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Store } from '@ngrx/store';
import { ProductDataStore } from '../../../stores/product/product.state';
import { Product } from '../../../models/product';
import { addProductDataFromApi } from '../../../stores/product/product.actions';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  toastMessage$ = this.productsService.message;

  constructor(private productsService: ProductsService, private productStore: Store<ProductDataStore>) {
  }

  submit(formData: NgForm) {
    this.productStore.dispatch(addProductDataFromApi({ call: this.productsService.addProduct(formData.value) }));
    //this.productsService.addProduct(formData.value);
    formData.reset();
    setTimeout(() => {
      this.toastMessage$.next('');
    }, 3000);

  }
}
