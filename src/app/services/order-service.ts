import { Injectable } from '@angular/core';
import { OrderModel } from '../models/orders-model';
export type OrderStatus = 'pending' | 'shipped' | 'delivered';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
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
    },{
      id: 103,
      items: [],
      userId: 4,
      totalPrice: 4500,
      status: 'shipped',
      createdAt: new Date('2024-05-10')
    },
    {
      id: 104,
      userId: 4,
      items: [],
      totalPrice: 150,
      status: 'pending',
      createdAt: new Date('2024-06-01')
    },{
      id: 105,
      items: [],
      userId: 3,
      totalPrice: 4500,
      status: 'shipped',
      createdAt: new Date('2024-05-10')
    },
    {
      id: 106,
      userId: 3,
      items: [],
      totalPrice: 150,
      status: 'pending',
      createdAt: new Date('2024-06-01')
    },{
      id: 107,
      items: [],
      userId: 3,
      totalPrice: 4500,
      status: 'shipped',
      createdAt: new Date('2024-05-10')
    },
    {
      id: 108,
      userId: 3,
      items: [],
      totalPrice: 150,
      status: 'pending',
      createdAt: new Date('2024-06-01')
    }
  ];
  getAllOrders(){
    return [...this.orders];
  }
  updateOrderStatus(orderId: number, status: OrderStatus) {
    const orderIndex = this.orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = status;
    } 
    console.log(this.orders)
  }
}
