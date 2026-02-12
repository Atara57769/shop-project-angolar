import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
export class OrdersManagement implements OnInit {
  srvOrders: OrderService = inject(OrderService);
  orders: OrderModel[] = [];
  private cdr = inject(ChangeDetectorRef);
  statuses: OrderStatus[] = ['pending', 'shipped', 'delivered'];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.srvOrders.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        console.log('Orders loaded:', this.orders);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        alert('Failed to load orders: ' + (err?.error?.message || err?.message || 'Unknown error'));
      }
    });
  }

  updateOrderStatus(orderId: number, status: OrderStatus) {
    this.srvOrders.updateOrderStatus(orderId, status, () => {
      console.log('Order status updated successfully');
      this.loadOrders();
    });
  }
}
