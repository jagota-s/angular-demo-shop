import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from '../../../models/userTypes';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  menutype = UserType.Default;
  searchresult: Product[] | undefined;
  cartCoount: number = 1;
  subscription: Subscription[] = [];

  constructor(private router: Router, private productService: ProductsService, private cartService: CartService) { }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('loggedInSeller') && val.url.includes('seller')) {
          this.menutype = UserType.Seller;
        } else if (localStorage.getItem('loggedInUser')) {
          this.menutype = UserType.User;
        } else {
          this.menutype = UserType.Default;
        }
      }
    })

    this.subscription.push(this.cartService.cartCount.subscribe((val) => {
      this.cartCoount = val;
    }))
  }

  // onSellerLogout() {
  //   localStorage.removeItem('seller');
  // }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  get sellerName() {
    const val = JSON.parse(localStorage.getItem('loggedInSeller')!).name;
    return val;
  }

  get userName() {
    return JSON.parse(localStorage.getItem('loggedInUser')!)[0].name;
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
    this.router.navigate(['/details', id], { onSameUrlNavigation: 'reload' });
  }

  submitSearch(input: any) {
    console.log(' submit search id', input.value);
    this.router.navigate(['/search', input.value]);
  }

  userLogout() {
    localStorage.removeItem('loggedInUser');
    this.cartService.cartCount.next(0);
    this.router.navigate(['/user-auth']);
  }

  getCartCount() {
    // const cart = JSON.parse(localStorage.getItem('cart')!);
    // this.cartCoount = cart.length;
    return 2;
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());

  }



}
