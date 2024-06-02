import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  popularProducts: Product[] = [];

  trendingProducts: Product[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    // console.log("Home component initialized");
    this.productService.getPopularProducts().subscribe((products) => {
      this.popularProducts = products;
    })
    this.productService.getTrendingProducts().subscribe((products) => {
      this.trendingProducts = products;
    })
  }

}
