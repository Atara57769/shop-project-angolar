import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderModel } from '../../../models/orders-model';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order-service';
import { UserService } from '../../../services/user-service';
import { Observable, of, catchError, finalize, shareReplay, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-orders',
  imports: [CommonModule, DatePipe],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.scss',
})
export class UserOrders implements OnInit {
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  userSrv = inject(UserService);
  router = inject(Router);
  orderSrv = inject(OrderService);
  private cdr = inject(ChangeDetectorRef);
  orders: OrderModel[] = [];
  loading = true;
  error = '';
  private ordersSub?: Subscription;

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.loading = true;
      this.userSrv.getUserOrders(currentUser.id).subscribe({
        next: (orders) => {
          this.orders = orders;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Failed to load orders: ' + err.error;
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      this.loading = false;
      this.error = 'No user logged in';
      this.cdr.detectChanges();
    }
  }
  updateStatus(id: number) {
    this.orderSrv.updateOrderStatus(id, 'delivered', () => {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.userSrv.getUserOrders(currentUser.id).subscribe({
          next: (orders) => {
            this.orders = orders;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Failed to refresh orders:', err);
          }
        });
      }
    });
  }

  showDetails(id: number) {
    this.router.navigate(
      ['order-details', id],
      { relativeTo: this.activatedRoute.parent }
    );
  }

  ngOnDestroy() {
    this.ordersSub?.unsubscribe();
  }
}
