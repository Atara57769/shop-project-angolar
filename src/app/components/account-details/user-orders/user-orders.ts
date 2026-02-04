import { Component } from '@angular/core';
import { OrderModel } from '../../../models/orders-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  imports: [DatePipe],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.scss',
})
export class UserOrders {
orders: OrderModel[] = [
  {
    id: 101,
    items: [],
    userId: 3,
    totalPrice: 4500,
    status: 'shipped',
    createdAt: new Date('2024-05-10')
  },
  {
    id: 102,
    userId: 3,
    items: [],
    totalPrice: 150,
    status: 'pending',
    createdAt: new Date('2024-06-01')
  }
];
updateStatus(id:number) {
  this.orders.find(o => o.id === id)!.status = 'delivered';
}
}
