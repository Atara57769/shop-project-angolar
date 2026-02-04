import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { PostUserModel } from '../../../models/post-user-model';
@Component({
  selector: 'app-update-user',
 imports: [ InputMaskModule,ButtonModule,RouterModule,PasswordModule,FloatLabel,FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, ReactiveFormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.scss',
})
export class UpdateUser {
user:PostUserModel=new PostUserModel();
  frmUpdate = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    phone: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
}
