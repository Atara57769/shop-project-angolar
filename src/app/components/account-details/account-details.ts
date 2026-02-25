import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { UpdateUser } from './update-user/update-user';
import { UserOrders } from './user-orders/user-orders';
import { Router, RouterModule, NavigationEnd, IsActiveMatchOptions, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-details',
  imports: [UpdateUser,UserOrders,RouterModule,RouterOutlet,CommonModule],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
})
export class AccountDetails implements OnInit {
  authService=inject(AuthService);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  isAdmin:boolean=false

  ngOnInit() {
    // Listen for navigation events and trigger change detection
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cdr.detectChanges();
    });
    this.isAdmin=this.authService.getCurrentUser()?.isAdmin ?? false
  }

  get orders(): boolean {
    return this.router.url.includes('/account/user-orders');
  }

  get updateDetails(): boolean {
    return this.router.url.includes('/account/update-user') || this.router.url === '/account';
  }

  showOrders() {
    this.router.navigateByUrl('/account/user-orders').then((success) => {
      if (success) {
        this.cdr.detectChanges();
      }
    });
  }

  showAdmin(){
    this.router.navigate(['/admin'])
  }

  updateUserDetails() {
    this.router.navigateByUrl('/account/update-user');
  }
  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('sign-in');
  }
  
}
