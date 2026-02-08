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
@Component({
  selector: 'app-header',
  imports: [ButtonModule,SignIn,SignUp,AccountDetails,BadgeModule,OverlayBadgeModule,AdminConsole,RouterModule,SplitButtonModule, ToastModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: [MessageService]
})
export class Header {
  authService=inject(AuthService);
  router = inject(Router);
  cartCount = 0;

  cartCountIncrement() {
    this.cartCount++;
  }
  accountShow() {   
  if (this.authService.isUserConnect()) {
    this.router.navigateByUrl('account')
  } else {
    this.router.navigateByUrl('sign-up'); 
  }
  }
   
    }





