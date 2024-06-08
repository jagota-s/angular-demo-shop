import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  totalPrice = 10000; // Get the total price from the cart

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
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


  }

}
