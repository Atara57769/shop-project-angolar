import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PostUserModel } from '../../models/post-user-model';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { UserModel } from '../../models/user-model';
@Component({
  selector: 'app-sign-in',
  imports: [ButtonModule, RouterModule, PasswordModule, FloatLabel, FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  userServ = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);
  user: PostUserModel = new PostUserModel();
  frmSignUp = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl('', [Validators.required])
  });
  signIn() {
  const email = this.frmSignUp.get('email')?.value || '';
  const password = this.frmSignUp.get('password')?.value || '';

  this.userServ.loginUser(email, password).subscribe({
    next: (loggedInUser: UserModel) => {

      this.authService.login(loggedInUser);

      if (loggedInUser.isAdmin) {
        this.router.navigateByUrl('admin');
      } else {
        this.router.navigateByUrl('account');
      }
    },
    error: (err) => {
       alert("we cant found you,please try again!");
    }
  });
}
  signUpShow() {
    this.router.navigateByUrl('sign-up');
  }
}