import { Component, inject } from '@angular/core';
import { OrderModel } from '../../../models/orders-model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order-service';

@Component({
  selector: 'app-user-orders',
  imports: [DatePipe],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.scss',
})
export class UserOrders {
    authService=inject(AuthService);
     activatedRoute = inject(ActivatedRoute)
  router = inject(Router);
  orderSrv=inject(OrderService);
orders: OrderModel[] = [];
ngOnInit() {
  this.orders = this.authService.getCurrentUser()?.orders ?? [];
}
updateStatus(id:number) {
  const orderIndex = this.orders.findIndex(o => o.id === id);
  if (orderIndex !== -1) {
    this.orders[orderIndex].status = 'delivered';
  }
  this.orderSrv.updateOrderStatus(id, 'delivered');
}
  showDetails(id: number) {
    this.router.navigate(
      ['order-details', id],
      { relativeTo: this.activatedRoute.parent }
    );
  }
}
