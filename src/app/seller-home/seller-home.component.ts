import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {

  productList: Product[] = [];
  productDeleteMessage = '';

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.getLatestProducts();
  }


  onProductDelete(id: string) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productDeleteMessage = "Product deleted successfully";
        this.getLatestProducts();
      }
    });
    setTimeout(() => {
      this.productDeleteMessage = '';
    }, 3000);
  }

  getLatestProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.productList = data;
    });
  }



}
