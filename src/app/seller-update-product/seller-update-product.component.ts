import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {

  productData!: Product;
  updateMessage = '';

  constructor(private porductService: ProductsService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    this.porductService.getProductById(productId!).subscribe((product) => {
      this.productData = product;
    });

  }

  submit(formData: NgForm) {
    console.log('Product updated');
    this.porductService.updateProduct(this.productData.id!, formData.value).subscribe((result) => {
      if (result) {
        this.updateMessage = 'Product updated successfully';
      }
    });
    setTimeout(() => {
      this.updateMessage = '';
    }, 3000);
  }

}
