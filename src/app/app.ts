import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductManagement } from './components/admin-console/product-management/product-management';
import { EditProduct } from './components/admin-console/product-management/edit-product/edit-product';
import { OrdersManagement } from './components/admin-console/orders-management/orders-management';
import { SignIn } from './components/sign-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';
import { AdminConsole } from './components/admin-console/admin-console';
import { AccountDetails } from './components/account-details/account-details';
import { Header } from './components/header/header';


@Component({
  selector: 'app-root',
  imports: [AccountDetails,SignIn,SignUp,AdminConsole,Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('project');
}
