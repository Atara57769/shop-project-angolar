import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { UserModel } from '../../models/user-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PostUserModel } from '../../models/post-user-model';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-sign-up',
  imports: [ButtonModule, RouterModule, PasswordModule, FloatLabel, FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  userServ = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);
  user: PostUserModel = new PostUserModel();
  frmSignUp = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  signUp() {
    this.user = new PostUserModel();
    this.user.email = this.frmSignUp.get('email')?.value || '';
    this.user.firstName = this.frmSignUp.get('firstName')?.value || '';
    this.user.lastName = this.frmSignUp.get('lastName')?.value || '';
    this.user.address = this.frmSignUp.get('address')?.value || '';
    this.user.password = this.frmSignUp.get('password')?.value || '';
    this.authService.login(this.userServ.addUser(this.user));
    this.router.navigateByUrl('account')
  }
  signInShow() {
    this.router.navigateByUrl('sign-in');
  }
}
