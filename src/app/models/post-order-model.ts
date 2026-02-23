import { PostOrderItemModel } from './post-order-item-model';
import { OrderStatus } from './orders-model';

export class PostOrderModel{
  id?: number;
  userId?: number; 
  orderItems: PostOrderItemModel[]=[];
  orderSum: number=0;
  status:OrderStatus='pending';
  orderDate: Date = new Date();
}
