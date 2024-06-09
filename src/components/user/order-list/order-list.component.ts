import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {

  orderData: Order[] | undefined;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
    const userID = loggedInUser[0].id;
    this.orderService.getOrders(userID).subscribe((data) => {
      console.log(data);
      this.orderData = data;
    });
  }

  cancelOrder(id: any) { }

}
