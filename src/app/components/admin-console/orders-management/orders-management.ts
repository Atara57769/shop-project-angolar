import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderModel, OrderStatus } from '../../../models/orders-model';
import { OrderService } from '../../../services/order-service';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orders-management',
  imports: [ButtonModule, Select, FormsModule, DatePipe],
  templateUrl: './orders-management.html',
  styleUrl: './orders-management.scss',
})
export class OrdersManagement {
srvOrders: OrderService = inject(OrderService);
orders: OrderModel[] = [];
statuses: OrderStatus[] = ['pending', 'shipped', 'delivered'];
ngOnInit() {
  this.orders = this.srvOrders.getAllOrders();
}
updateOrderStatus(orderId: number, status: OrderStatus) {
  this.srvOrders.updateOrderStatus(orderId, status);
  this.orders = this.srvOrders.getAllOrders();
}
}
