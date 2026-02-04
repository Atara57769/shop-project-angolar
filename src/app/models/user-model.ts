import { OrderModel } from "./orders-model";

export class UserModel{
  id?: number;
  firstName:string=""
  lastName:string=""
  password:string=""
  adress:string='';
  orders: OrderModel[]=[];
}