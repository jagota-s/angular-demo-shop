import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { Store } from '@ngrx/store';
import { ProductDataStore } from '../../../stores/product/product.state';
import { updateProductDataFromApi } from '../../../stores/product/product.actions';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {

  productData!: Product;
  updateMessage = '';

  constructor(private porductService: ProductsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private productStore: Store<ProductDataStore>) { }

  ngOnInit() {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    this.porductService.getProductById(productId!).subscribe((product) => {
      this.productData = product;
    });

  }


  submit(formData: NgForm) {
    this.productStore.dispatch(updateProductDataFromApi({ call: this.porductService.updateProduct(this.productData.id!, formData.value) }));
    formData.reset();
    setTimeout(() => {
      this.router.navigate(['/seller-home']);
    }, 3000);
  }

}
