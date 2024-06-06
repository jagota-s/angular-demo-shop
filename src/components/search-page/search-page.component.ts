import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
  searchResult!: Product[];

  constructor(private productService: ProductsService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const queryItem = this.activeRoute.snapshot.paramMap.get('query');
    this.productService.searchProduct(queryItem!).pipe(
      catchError((error) => {
        console.log("Error in searching products", error);
        return of([]);
      })
    ).subscribe((products) => {
      this.searchResult = products;
    });
  }

}
