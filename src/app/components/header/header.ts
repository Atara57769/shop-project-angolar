import { Component, inject } from '@angular/core';
import { SignIn } from '../sign-in/sign-in';
import { SignUp } from '../sign-up/sign-up';
import { AccountDetails } from '../account-details/account-details';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ButtonModule } from 'primeng/button';
import { AdminConsole } from '../admin-console/admin-console';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Cart } from '../cart/cart';
import { CartService } from '../../services/cart-service';
import { computed } from '@angular/core';
@Component({
  selector: 'app-header',
  imports: [ButtonModule, SignIn, SignUp, AccountDetails, BadgeModule, OverlayBadgeModule, AdminConsole, RouterModule, SplitButtonModule, ToastModule, Cart],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: [MessageService]
})

export class Header {

  authService = inject(AuthService);
  router = inject(Router);
  cartService = inject(CartService);
  cartCount = this.cartService.cartCount;


  userName = computed(() => {
  const user = this.authService.getCurrentUser();
  return user?.firstName || 'Account';
});
  

  shopShow() {
    this.router.navigateByUrl('show-products');
  }

  accountShow() {
    if (this.authService.isUserConnect()) {
      this.router.navigateByUrl('account')
    } else {
      this.router.navigateByUrl('sign-up');
    }
  }

  cartShow() {
    this.router.navigateByUrl('cart');
  }

}





