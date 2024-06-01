import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from '../../../models/userTypes';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menutype = UserType.Default;
  searchresult: Product[] | undefined;

  constructor(private router: Router, private productService: ProductsService) { }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menutype = UserType.Seller;
        } else {
          this.menutype = UserType.Default;
        }
      }
    })
  }

  onSellerLogout() {
    localStorage.removeItem('seller');
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  get sellerName() {
    const val = JSON.parse(localStorage.getItem('seller')!).name;
    return val;
  }

  searchProducts(query: KeyboardEvent) {
    const searchQuery = (query.target as HTMLInputElement).value;
    console.log(searchQuery);
    this.productService.searchProduct(searchQuery).subscribe((products) => {
      this.searchresult = products;
      //console.log('value of ', this.searchresult);
    });
  }

  hideSearchResults() {
    this.searchresult = [];
  }

  redirectToDetails(id: string) {
    console.log(' redirect id', id);
    this.router.navigate(['/details', id]);
  }

  submitSearch(input: any) {
    console.log(' submit search id', input.value);
    this.router.navigate(['/search', input.value]);
  }



}
