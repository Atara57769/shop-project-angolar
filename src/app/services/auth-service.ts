import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userServ = inject(UserService);

  login(user: UserModel) {
    sessionStorage.setItem("currentUser", JSON.stringify(user))
  }
  logout() {
    sessionStorage.removeItem("currentUser")
  }
  isUserConnect() {
    return sessionStorage.getItem('currentUser') !== null
  }
  getCurrentUser() {
    if (this.isUserConnect()) {
      const user = sessionStorage.getItem('currentUser')
      if (user)
        return JSON.parse(user);
    }
    return null;
  }  
}
