import { PostOrderItemModel } from './post-order-item-model';
export type OrderStatus = 'pending' | 'shipped' | 'delivered';

export class PostOrderModel{
  id?: number;
  userId?: number; 
  orderItems: PostOrderItemModel[]=[];
  orderSum: number=0;
  status:OrderStatus='pending';
  orderDate: Date = new Date();
}
