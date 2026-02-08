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
      orderItems: [
  {
    orderId: 101,
    productId: 1,
    quantity: 2,
    productName: 'Laptop Dell XPS',
    productImageUrl: 'https://via.placeholder.com/150',
    productPrice: 4500
  },
  {
    orderId: 101,
    productId: 2,
    quantity: 1,
    productName: 'Wireless Mouse',
    productImageUrl: 'https://via.placeholder.com/150',
    productPrice: 150
  },
  {
    orderId: 101,
    productId: 3,
    quantity: 3,
    productName: 'Mechanical Keyboard',
    productImageUrl: 'https://via.placeholder.com/150',
    productPrice: 350
  }
],
      userId: 3,
      totalPrice: 4500,
      status: 'shipped',
      createdAt: new Date('2024-05-10')
    },
    {
      id: 102,
      userId: 3,
      orderItems: [],
      totalPrice: 150,
      status: 'pending',
      createdAt: new Date('2024-06-01')
    },{
      id: 103,
      orderItems: [],
      userId: 4,
      totalPrice: 4500,
      status: 'shipped',
      createdAt: new Date('2024-05-10')
    },
    {
      id: 104,
      userId: 4,
      orderItems: [],
      totalPrice: 150,
      status: 'pending',
      createdAt: new Date('2024-06-01')
    },{
      id: 105,
      orderItems: [],
      userId: 3,
      totalPrice: 4500,
      status: 'shipped',
      createdAt: new Date('2024-05-10')
    },
    {
      id: 106,
      userId: 3,
      orderItems: [],
      totalPrice: 150,
      status: 'pending',
      createdAt: new Date('2024-06-01')
    },{
      id: 107,
      orderItems: [],
      userId: 3,
      totalPrice: 4500,
      status: 'shipped',
      createdAt: new Date('2024-05-10')
    },
    {
      id: 108,
      userId: 3,
      orderItems: [],
      totalPrice: 150,
      status: 'pending',
      createdAt: new Date('2024-06-01')
    }
  ];
  getAllOrders(){
    return [...this.orders];
  }
  updateOrderStatus(orderId: number, status: OrderStatus) {
    const orderIndex = this.orders.findIndex(o => o.id === orderId)
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = status;
    } 
    console.log(this.orders)
  }
  getOrderById(id: number) {
    return this.orders.find(o => o.id === id);
  } 
}
