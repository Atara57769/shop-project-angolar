import { OrderItemModel } from "./order-item-model";
export type OrderStatus =| 'created'| 'collected'| 'shipped'| 'delivered';
export class OrderModel{
  id?: number;
  userId?: number; 
  orderItems: OrderItemModel[]=[];
  orderSum: number=0;
  status:OrderStatus='created';
  orderDate: Date=new Date();
}