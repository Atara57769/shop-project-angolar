import { OrderModel } from "./orders-model";

export class PostUserModel{
  id?: number;
  email:string=""
  firstName:string=""
  lastName:string=""
  password:string=""
  address:string='';
  phone:string='';
  orders: OrderModel[]=[];
}