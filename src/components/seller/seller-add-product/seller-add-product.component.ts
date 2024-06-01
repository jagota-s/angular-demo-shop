import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  toastMessage$ = this.productsService.message;

  constructor(private productsService: ProductsService) {
  }

  submit(formData: NgForm) {
    this.productsService.addProduct(formData.value);
    formData.reset();
    setTimeout(() => {
      this.toastMessage$.next('');
    }, 3000);

  }
}
