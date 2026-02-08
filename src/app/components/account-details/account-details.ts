import { Component, inject } from '@angular/core';
import { UpdateUser } from './update-user/update-user';
import { UserOrders } from './user-orders/user-orders';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-account-details',
  imports: [UpdateUser,UserOrders,RouterModule],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
})
export class AccountDetails {
  orders:boolean=false;
  updateDetails:boolean=true;
  authService=inject(AuthService);
  router = inject(Router);
  showOrders() {
    this.orders=true;
    this.updateDetails=false;
    this.router.navigate(['/account/user-orders']);
  }
updateUserDetails() {
    this.orders=false;
    this.updateDetails=true;
    this.router.navigate(['/account/update-user']);
  }
  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('sign-in');
  }
  
}
