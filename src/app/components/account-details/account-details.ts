import { Component } from '@angular/core';
import { UpdateUser } from './update-user/update-user';
import { UserOrders } from './user-orders/user-orders';

@Component({
  selector: 'app-account-details',
  imports: [UpdateUser,UserOrders],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
})
export class AccountDetails {
  orders:boolean=false;
  updateDetails:boolean=true;

  showOrders() {
    this.orders=true;
    this.updateDetails=false;
  }
updateUserDetails() {
    this.orders=false;
    this.updateDetails=true;
  }
}
