import { Component } from '@angular/core';
import { SignIn } from '../sign-in/sign-in';
import { SignUp } from '../sign-up/sign-up';
import { AccountDetails } from '../account-details/account-details';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ButtonModule } from 'primeng/button';
import { AdminConsole } from '../admin-console/admin-console';
@Component({
  selector: 'app-header',
  imports: [ButtonModule,SignIn,SignUp,AccountDetails,BadgeModule,OverlayBadgeModule,AdminConsole],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  cartCount = 0;
  cartCountIncrement() {
    this.cartCount++;
  }

  accounVisible = false;
  signInVisible = false;
  signUpVisible = false;
  adminConsoleVisible = false;
  accountShow() {
    this.accounVisible = true;
    this.signInVisible = false;
    this.signUpVisible = false;
    this.adminConsoleVisible = false;
  }
  signInShow() {
    this.signInVisible = true;
    this.accounVisible = false;
    this.signUpVisible = false;
    this.adminConsoleVisible = false;
  }
  signUpShow() {
    this.signUpVisible = true;
    this.accounVisible = false;
    this.signInVisible = false;
    this.adminConsoleVisible = false;
  }
  adminConsoleShow() {
    this.adminConsoleVisible = true;
    this.signUpVisible = false;
    this.accounVisible = false;
    this.signInVisible = false;
  }

  

}
