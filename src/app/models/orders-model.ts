import { OrderItemModel } from "./order-item-model";
export type OrderStatus = 'pending' | 'shipped' | 'delivered';
export class OrderModel{
  id!: number;
  userId?: number; 
  items: OrderItemModel[]=[];
  totalPrice: number=0;
  status:OrderStatus='pending';
  createdAt: Date=new Date();
}