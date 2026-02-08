import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderModel } from '../../../models/orders-model';
import { OrderService } from '../../../services/order-service';
import { OrderItemModel } from '../../../models/order-item-model';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  orderSrv = inject(OrderService);
  currentId: number = 0;
  order?: OrderModel;
  ordrsItems: OrderItemModel[] = [];
  placeholder = 'https://via.placeholder.com/200x200.png?text=Product';

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      if (p['id']) {
        this.currentId = Number(p['id']);
        this.order = this.orderSrv.getOrderById(this.currentId);
        this.ordrsItems = this.order?.orderItems ?? [];
      }
    });
  }

  goBack() {
    this.router.navigate(['../user-orders'], { relativeTo: this.activatedRoute });
  }
}
