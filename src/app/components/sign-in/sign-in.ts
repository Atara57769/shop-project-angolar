import { Component } from '@angular/core';
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
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-sign-in',
  imports: [ ButtonModule,RouterModule,PasswordModule,FloatLabel,FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
user:UserModel=new UserModel();
  frmSignUp = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl('', [Validators.required])
  });
}
