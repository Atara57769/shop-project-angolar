import { OrderModel } from "./orders-model";

export class UserModel{
  id?: number;
  email:string=""
  firstName:string=""
  lastName:string=""
  address:string='';
  phone:string='';
  isAdmin?:boolean=false
  orders: OrderModel[]=[];
}