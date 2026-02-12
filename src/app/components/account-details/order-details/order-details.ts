import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { OrderModel } from '../../../models/orders-model';
import { OrderService } from '../../../services/order-service';
import { OrderItemModel } from '../../../models/order-item-model';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  orderSrv = inject(OrderService);
  private cdr = inject(ChangeDetectorRef);
  currentId: number = 0;
  order?: OrderModel;
  ordrsItems: OrderItemModel[] = [];
  placeholder = 'https://via.placeholder.com/200x200.png?text=Product';

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      if (p['id']) {
        this.currentId = Number(p['id']);
        this.orderSrv.getOrderById(this.currentId).subscribe({
          next: (order) => {
            this.order = order;
            this.ordrsItems = this.order?.orderItems ?? [];
            this.cdr.detectChanges();
            console.log('Order loaded:', this.order);
            console.log('Order items:', this.ordrsItems);
          },
          error: (err) => {
            console.error('Error loading order details:', err);
            const errorMessage = err?.error?.message || err?.message || 'Unable to load order details. Please try again.';
            alert('Failed to load order details: ' + errorMessage);
          }
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['../../user-orders'], { relativeTo: this.activatedRoute });
  }
}
