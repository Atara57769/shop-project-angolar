import { inject, Injectable } from '@angular/core';
import { OrderModel } from '../models/orders-model';
import { HttpClient } from '@angular/common/http';
import { item } from '@primeuix/themes/nora/tieredmenu';
import { PostOrderItemModel } from '../models/post-order-item-model';
import { PostOrderModel } from '../models/post-order-model';
import { OrderStatus } from '../models/orders-model';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:44313/api';
  getAllOrders() {
    return this.http.get<OrderModel[]>(`${this.baseUrl}/orders`);
  }
  updateOrderStatus(orderId: number, status: OrderStatus, onComplete: () => void) {
    this.getOrderById(orderId).subscribe(order => {
      if (order) {
        order.status = status;
        this.http.put(`${this.baseUrl}/orders/${order.id}`, order)
          .subscribe({
            next: () => onComplete(),
            error: (err) => {
              console.error(err);
              onComplete();
            }
          });
      }
    });
  }
  getOrderById(id: number) {
    return this.http.get<OrderModel>(`${this.baseUrl}/orders/${id}`);
  }

  createOrder(order: PostOrderModel) {
    return this.http.post<PostOrderModel>(`${this.baseUrl}/orders`, order);
  }

}
