import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { PostUserModel } from '../models/post-user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: PostUserModel[] = []

  getUserById(userId: number) {
    return this.users.find(u => u.id === userId);
  }

  updateUser(updatedUser: PostUserModel) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === updatedUser.id) {
        this.users[i] = updatedUser;
        break;
      }
    }
  }
  addUser(newUser: PostUserModel) {
    this.users.push(newUser);
    let user: UserModel = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      address: newUser.address,
      orders: []
    }
    return user
  }
  loginUser(email: string, password: string) {
    //let post = this.users.find(u => u.email === email && u.password === password);
     {
      let user: UserModel = {
        id: 1,
        email: "post.email",
        firstName:" post.firstName",
        lastName: "post.lastName",
        address: "post.address",
        isAdmin: true,
        orders: []
      }
      return user
    }
    return null;
  }
}
   
  


