import { inject, Injectable } from '@angular/core';
import { OrderModel } from '../models/orders-model';
import { HttpClient } from '@angular/common/http';
export type OrderStatus = 'pending' | 'shipped' | 'delivered';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:44313/api';
  getAllOrders(){
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
}
