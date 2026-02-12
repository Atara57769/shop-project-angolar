import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { PostUserModel } from '../models/post-user-model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { UpdateUserModel } from '../models/update-user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: PostUserModel[] = [];
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:44313/api';

  getUserById(userId: number) {
    return this.http.get<UserModel>(`${this.baseUrl}/users/${userId}`);
  }

  getCurrentUserFromServer() {
    const userJson = sessionStorage.getItem('currentUser');
    if (!userJson) {
      return of(null);
    }
    const { id } = JSON.parse(userJson) as UserModel;
    return this.getUserById(id);
  }

  updateUser(id: number, updatedUser: UpdateUserModel) {
    return this.http.put(`${this.baseUrl}/users/${id}`, updatedUser);
  }

  addUser(newUser: PostUserModel) {
    return this.http.post<UserModel>(`${this.baseUrl}/users`, newUser);
  }

  loginUser(email: string, password: string) {
    return this.http.post<UserModel>(`${this.baseUrl}/users/login`, { email, password });
  }
}
