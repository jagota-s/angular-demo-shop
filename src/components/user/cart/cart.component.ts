import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, PriceSummary } from '../../../models/cart';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {

  cartData: Product[] | undefined;
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,

  }


  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
    const userID = loggedInUser[0].id;
    this.cartService.getCartItems(userID).subscribe((data) => {
      if (data.length > 0) {
        this.cartData = data[0].product;
        // Calculate total price and update each product's total price
        this.cartData.forEach((product) => {
          // Extract numerical value from price string
          const price = parseFloat(product.price.replace(/[^\d.-]/g, '')); // Remove non-numeric characters
          const quantity = product.quantity || 1; // If quantity is undefined, default to 1
          if (!isNaN(price) && !isNaN(quantity)) {
            const totalPrice = price * quantity;
            this.priceSummary.price += totalPrice;
            this.priceSummary.delivery = 10;
            this.priceSummary.tax += totalPrice * 0.13;
            this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery;

          }
        });
      } else {
        // Handle case where no cart items are found
        console.log("No cart items found for user:", userID);
      }
    });
  }



  checkout() {
    this.router.navigate(['/checkout']);
  };

  removeToCart(id: string) {
    //this.cartService.removeProductFromCart(id);
  };

  ngOnDestroy(): void {

  }f

}
