import { inject, Injectable, signal, effect } from '@angular/core';
import { UserModel } from '../models/user-model';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userServ = inject(UserService);

  private STORAGE_KEY = 'currentUser';


  private currentUserSignal = signal<UserModel | null>(this.loadUser());

  constructor() {

    effect(() => {
      const user = this.currentUserSignal();

      if (user) {
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      } else {
        sessionStorage.removeItem(this.STORAGE_KEY);
      }
    });
  }


  private loadUser(): UserModel | null {
    const user = sessionStorage.getItem(this.STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  }



  login(user: UserModel) {
    this.currentUserSignal.set(user); 
  }

  logout() {
    this.currentUserSignal.set(null);
  }

  isUserConnect() {
    return this.currentUserSignal() !== null;
  }

  getCurrentUser(): UserModel | null {
    return this.currentUserSignal();
  }
}