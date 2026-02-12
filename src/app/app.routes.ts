import { Routes } from '@angular/router';
import { SignIn } from './components/sign-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';
import { AccountDetails } from './components/account-details/account-details';
import { ProductManagement } from './components/admin-console/product-management/product-management';
import { OrdersManagement } from './components/admin-console/orders-management/orders-management';
import { AdminConsole } from './components/admin-console/admin-console';
import { UpdateUser } from './components/account-details/update-user/update-user';
import { UserOrders } from './components/account-details/user-orders/user-orders';
import { OrderDetails } from './components/account-details/order-details/order-details';
import { ShowProducts } from './components/show-products/show-products';
import { ProductDetails } from './components/product-details/product-details';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
  { path: 'show-products', component: ShowProducts },
  { path: 'product-details/:id', component: ProductDetails },
  { path: 'products', component: ProductManagement },
  { path: 'orders', component: OrdersManagement },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'account', component: AccountDetails ,children:[
        {path: '', redirectTo: 'update-user', pathMatch:'full'},
        {path:'update-user', component:UpdateUser},
        {path:'user-orders', component:UserOrders},
        {path:'order-details/:id', component:OrderDetails}
    ]},
  { path: 'admin', component: AdminConsole }
];
