import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  totalPrice = 10000; // Get the total price from the cart

  constructor(private orderService: OrderService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    // this.cartService.getCartItems().subscribe((data) => {
    //   console.log(data);
    // })

  }

  orderNow(form: NgForm) {
    console.log(form.value);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
    const userID = loggedInUser[0].id;
    let order: Order = {
      ...form.value,
      totalPrice: this.totalPrice,
      userId: userID
    }

    this.orderService.orderNow(order).subscribe((data) => {
      console.log(data);
    });

    // clear the cart here as well
    // todo

    this.router.navigate(['/order-list']);

  }

}
