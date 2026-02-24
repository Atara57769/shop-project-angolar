import { Component, inject, signal } from '@angular/core';
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
import { UserService } from '../../../services/user-service';
import { AuthService } from '../../../services/auth-service';
import { UserModel } from '../../../models/user-model';
import { UpdateUserModel } from '../../../models/update-user-model';
@Component({
  selector: 'app-update-user',
  imports: [InputMaskModule, ButtonModule, RouterModule, PasswordModule, FloatLabel, FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, ReactiveFormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.scss',
})
export class UpdateUser {
  userServ = inject(UserService);
  authService = inject(AuthService);
  message = signal('');
  user: PostUserModel = new PostUserModel();
  frmUpdate = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl('', [Validators.required])
  });
  ngOnInit() {
    let currentUser: UserModel | null = this.authService.getCurrentUser();
    if (currentUser) {
      this.frmUpdate.patchValue({
        phoneNumber: currentUser.phoneNumber,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address
      });
    }
  }


  update() {
    if (this.frmUpdate.invalid) return;

    const currentUser: UserModel | null = this.authService.getCurrentUser();
    if (!currentUser) return;

    const updatedUser: UpdateUserModel = {
      id: currentUser.id,
      phoneNumber: this.frmUpdate.get('phoneNumber')?.value || currentUser.phoneNumber,
      firstName: this.frmUpdate.get('firstName')?.value || currentUser.firstName,
      lastName: this.frmUpdate.get('lastName')?.value || currentUser.lastName,
      address: this.frmUpdate.get('address')?.value || currentUser.address
    };

    this.userServ.updateUser(currentUser.id, updatedUser)
      .subscribe({
        next: () => {
          const mergedUser = { ...currentUser, ...updatedUser };
          this.authService.login(mergedUser);
          this.message.set('Your account has been updated successfully!');
        },
        error: (err) => {
          this.message.set('Update failed: ' + (err.error || 'An error occurred. Please try again.'));
        }
      });

  }
}
