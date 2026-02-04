import { Routes } from '@angular/router';
import { SignIn } from './components/sign-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';
import { AccountDetails } from './components/account-details/account-details';
import { ProductManagement } from './components/admin-console/product-management/product-management';
import { OrdersManagement } from './components/admin-console/orders-management/orders-management';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductManagement },
  { path: 'orders', component: OrdersManagement },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'account', component: AccountDetails },
  { path: '**', redirectTo: 'products' }
];
