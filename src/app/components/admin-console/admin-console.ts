import { Component } from '@angular/core';
import { ProductManagement } from './product-management/product-management';
import { OrdersManagement } from './orders-management/orders-management';

@Component({
  selector: 'app-admin-console',
  imports: [ProductManagement,OrdersManagement],
  templateUrl: './admin-console.html',
  styleUrl: './admin-console.scss',
})
export class AdminConsole {
prod:boolean=true;
orders:boolean=false;
showProducts(){
  this.prod=true;
  this.orders=false;
}
showOrders(){
  this.prod=false;
  this.orders=true;
}
}
